<?php
/**
 * Instagram Posts script for Sial Paris
 * Get latest instagram posts and store datas and images
 * Request new datas from instagram 1 time / hour max
 */

header('Content-Type: application/json; charset=utf-8');

if (isItWorthParseInstagramSourceCode()) {
    $curl_connection = curl_init();
    curl_setopt($curl_connection, CURLOPT_URL, 'https://www.instagram.com/sial.paris/');
    curl_setopt($curl_connection, CURLOPT_HEADER, 0);
    curl_setopt($curl_connection, CURLOPT_CONNECTTIMEOUT, 0);
    curl_setopt($curl_connection, CURLOPT_TIMEOUT, 0);
    curl_setopt($curl_connection, CURLOPT_DNS_CACHE_TIMEOUT, 0);
    curl_setopt($curl_connection, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl_connection, CURLOPT_SSL_VERIFYPEER, false);
    $html = curl_exec($curl_connection);
    if ($html) {
        $search = preg_match('/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/', $html, $matches, PREG_OFFSET_CAPTURE);
        if ($search === 1) {
            if (array_key_exists(1, $matches)) {
                if (array_key_exists(0, $matches[1])) {
                    $jsonStr = substr($matches[1][0], 0, -1);
                    if ($jsonStr) {
                        $jsonObj = json_decode($jsonStr, true);
                        if (json_last_error() === JSON_ERROR_NONE) {
                            if (array_key_exists('entry_data', $jsonObj)) {
                                if (array_key_exists('ProfilePage', $jsonObj['entry_data'])) {
                                    if (array_key_exists(0, $jsonObj['entry_data']['ProfilePage'])) {
                                        if (array_key_exists('graphql', $jsonObj['entry_data']['ProfilePage'][0])) {
                                            if (array_key_exists('user', $jsonObj['entry_data']['ProfilePage'][0]['graphql'])) {
                                                if (array_key_exists('edge_owner_to_timeline_media', $jsonObj['entry_data']['ProfilePage'][0]['graphql']['user'])) {
                                                    if (array_key_exists('edges', $jsonObj['entry_data']['ProfilePage'][0]['graphql']['user']['edge_owner_to_timeline_media'])) {
                                                        $mediaArray = array_splice($jsonObj['entry_data']['ProfilePage'][0]['graphql']['user']['edge_owner_to_timeline_media']['edges'], 0, 10);
                                                        $postsFromLocalDatas = getPostsFromLocalDatas();
                                                        $date = new DateTime();
                                                        $new_last_check = $date->getTimestamp();
                                                        $new_datas = [
                                                            'last_check' => $new_last_check,
                                                            'posts' => $postsFromLocalDatas
                                                        ];
                                                        $new_content = json_encode($new_datas, JSON_UNESCAPED_SLASHES);
                                                        if (json_last_error() === JSON_ERROR_NONE) {
                                                            file_put_contents("posts.json", $new_content);
                                                        }
                                                        $new_posts = [];
                                                        for ($i = 0; $i < count($mediaArray); ++$i) {
                                                            if (array_key_exists('node', $mediaArray[$i])) {
                                                                $node = $mediaArray[$i]['node'];
                                                                if (array_key_exists('__typename', $node)) {
                                                                    if ($node['__typename'] === 'GraphSidecar' || $node['__typename'] === 'GraphImage' || $node['__typename'] === 'GrapdadazzhVideo') {
                                                                        $id = $node['id'];
                                                                        if (!array_key_exists($id, $postsFromLocalDatas)) {
                                                                            $image = $node['thumbnail_src'];
                                                                            $link = 'https://www.instagram.com/p/' . $node['shortcode'] . '/';
                                                                            if (!is_dir('img')) {
                                                                                mkdir('img');
                                                                            }
                                                                            if (file_put_contents('img/' . $id . '.jpg', file_get_contents($image))) {
                                                                                $new_posts[$id] = [
                                                                                    'link' => $link
                                                                                ];
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if (sizeof($new_posts) > 0) {
                                                            foreach ($postsFromLocalDatas as $key => $value) {
                                                                $new_posts[$key] = $value;
                                                            }
                                                            $new_datas = [
                                                                'last_check' => $new_last_check,
                                                                'posts' => $new_posts
                                                            ];
                                                            $new_content = json_encode($new_datas, JSON_UNESCAPED_SLASHES);
                                                            if (json_last_error() === JSON_ERROR_NONE) {
                                                                file_put_contents("posts.json", $new_content);
                                                            }
                                                            returnResult(getPostsFromLocalDatas());
                                                        } else {
                                                            returnResult($postsFromLocalDatas);
                                                        }
                                                    } else {
                                                        returnResult(getPostsFromLocalDatas());
                                                    }
                                                } else {
                                                    returnResult(getPostsFromLocalDatas());
                                                }
                                            } else {
                                                returnResult(getPostsFromLocalDatas());
                                            }
                                        } else {
                                            returnResult(getPostsFromLocalDatas());
                                        }
                                    } else {
                                        returnResult(getPostsFromLocalDatas());
                                    }
                                } else {
                                    returnResult(getPostsFromLocalDatas());
                                }
                            } else {
                                returnResult(getPostsFromLocalDatas());
                            }
                        } else {
                            returnResult(getPostsFromLocalDatas());
                        }
                    } else {
                        returnResult(getPostsFromLocalDatas());
                    }
                } else {
                    returnResult(getPostsFromLocalDatas());
                }
            } else {
                returnResult(getPostsFromLocalDatas());
            }
        } else {
            returnResult(getPostsFromLocalDatas());
        }
    } else {
        returnResult(getPostsFromLocalDatas());
    }
    curl_close($curl_connection);
} else {
    returnResult(getPostsFromLocalDatas());
}

function returnResult($array)
{
    if (sizeOf($array) > 10) {
        $array = array_combine(array_slice(array_keys($array), 0, 10), array_slice($array, 0, 10));
    }
    $result = json_encode($array, JSON_UNESCAPED_SLASHES);
    if (json_last_error() === JSON_ERROR_NONE) {
        echo $result;
    } else {
        echo '{}';
    }
}

function isItWorthParseInstagramSourceCode()
{
    $strJsonFileContents = file_get_contents("posts.json");
    if (is_string($strJsonFileContents)) {
        $json_datas = json_decode($strJsonFileContents, true);
        if (json_last_error() === JSON_ERROR_NONE) {
            if (array_key_exists('last_check', $json_datas)) {
                $date = new DateTime();
                if ($date->getTimestamp() - $json_datas['last_check'] <= 3600) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            return true;
        }
    } else {
        return true;
    }
}

function getPostsFromLocalDatas()
{
    $strJsonFileContents = file_get_contents("posts.json");
    if (is_string($strJsonFileContents)) {
        $json_datas = json_decode($strJsonFileContents, true);
        if (json_last_error() === JSON_ERROR_NONE) {
            if (array_key_exists('posts', $json_datas)) {
                return $json_datas['posts'];
            } else {
                return [];
            }
        } else {
            return [];
        }
    } else {
        return [];
    }
}