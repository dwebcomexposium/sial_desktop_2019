<?php
/**
 * Instagram Posts script for Sial Paris
 * Get latest instagram posts and store datas and images
 * 1 request/hour max
 */


//$strJsonFileContents = file_get_contents("posts.json");
//if (is_string($strJsonFileContents)) {
//  $json_datas = json_decode($strJsonFileContents, true);
//  foreach ($json_datas as $posts) {
//    foreach ($posts as $post) {
//      var_dump($post);
//      echo '<br />';
//      echo '<br />';
//    }
//  }
//}


$access_token = 'IGQVJYX1k3ZAEMxeVNGQkZAKRWhkdlVOQk1wUXQyMmEzaTM5UE9wcHl1dzZAJb2JjZA1lHZAkpuSnhGUTk4cFlmUEJGekc1WkVrNjlFLV9OWkdremEyY1VUWkNDc25KaVNZAbzJYVzl1TUhUdHFJcHNVUS1XVGdhM2xrNlJZAdFln';
$endpoint = '/me/media';
$query = [
  'access_token' => $access_token
];
$url = 'https://graph.instagram.com' . $endpoint . '?' . http_build_query($query) . '&fields=id%2Cmedia_type%2Cmedia_url%2Cpermalink%2Cthumbnail_url';

echo $url.'<br />';

try {
  $curl_connection = curl_init();
  curl_setopt($curl_connection, CURLOPT_URL, $url);
  curl_setopt($curl_connection, CURLOPT_HEADER, 0);
  curl_setopt($curl_connection, CURLOPT_CONNECTTIMEOUT, 0);
  curl_setopt($curl_connection, CURLOPT_TIMEOUT, 0);
  curl_setopt($curl_connection, CURLOPT_DNS_CACHE_TIMEOUT, 0);
  curl_setopt($curl_connection, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl_connection, CURLOPT_SSL_VERIFYPEER, false);
  $data = curl_exec($curl_connection);
//  $data = json_decode(curl_exec($curl_connection), true);



  var_dump($data);





//  if ($data) {





//    if (array_key_exists('data', $data)) {


      //var_dump($data['data']);


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
//          //todo Si post pas présent dans json, le créer + download médias
//        }
//    }
//  }
  curl_close($curl_connection);
} catch (Exception $e) {
  return $e->getMessage();
}
