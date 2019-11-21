<?php
/**
 * Instagram Posts script for Sial Paris
 * Get latest instagram posts and store datas and images
 * 1 request/hour max
 */

$strJsonFileContents = file_get_contents("posts.json");
if (is_string($strJsonFileContents)) {
  $json_datas = json_decode($strJsonFileContents, true);
  foreach ($json_datas as $post) {
    echo $post['post_link'];
  }
}

//$secret = get_custom_option('remonte-des-posts-instagram-secret-code'); //todo
//$access_token = get_custom_option('remonte-des-posts-instagram-accesstoken-code'); //todo
//
//$endpoint = '/users/self/media/recent';
//
//$query = [
//  'access_token' => $access_token,
//  'count' => 10,
//];
//
//$sig = generate_sig($endpoint, $query, $secret);
//
//$query = array_merge(
//  $query, [
//    'sig' => $sig,
//  ]
//);
//
//$url = 'https://api.instagram.com/v1' . $endpoint . '?' . http_build_query($query);
//
//if (filter_var($url, FILTER_VALIDATE_URL)) {
//  try {
//    $curl_connection = curl_init($url);
//    curl_setopt($curl_connection, CURLOPT_CONNECTTIMEOUT, 0);
//    curl_setopt($curl_connection, CURLOPT_TIMEOUT, 0);
//    curl_setopt($curl_connection, CURLOPT_DNS_CACHE_TIMEOUT, 0);
//    curl_setopt($curl_connection, CURLOPT_RETURNTRANSFER, true);
//    curl_setopt($curl_connection, CURLOPT_SSL_VERIFYPEER, false);
//    $data = json_decode(curl_exec($curl_connection), true);
//    if ($data) {
//      if (array_key_exists('data', $data)) {
//        $final_posts = [];
//        foreach ($data['data'] as $post) {
//          if ($post['id'] && $post['images']['standard_resolution']['url'] && $post['link']) {
//            array_push($final_posts, $post);
//          }
//        }
//        $final_posts = array_reverse($final_posts);
//        foreach ($final_posts as $post_inte) {
//          $post_img_url = $post_inte['images']['standard_resolution']['url'];
//          $post_link = $post_inte['link'];
//          $post_id = $post_inte['id'];
//          $post_video_url = false;
//          if (array_key_exists('videos', $post_inte)) {
//            $post_video_url = $post_inte['videos']['standard_resolution']['url'];
//          }
//
//
//
//
//
//
//
//          //todo Si post pas présent dans json, le créer + download médias
//        }
//      }
//    }
//    curl_close($curl_connection);
//  } catch (Exception $e) {
//    return $e->getMessage();
//  }
//}
//
//function generate_sig($endpoint, $params, $secret)
//{
//  $sig = $endpoint;
//  ksort($params);
//  foreach ($params as $key => $val) {
//    $sig .= "|$key=$val";
//  }
//  return hash_hmac('sha256', $sig, $secret, false);
//}
