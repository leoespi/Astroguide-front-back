<?php

namespace App\Http\Controllers\Feed;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Models\Comment;
use App\Models\Feed;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Relations\HasMany;


class FeedController extends Controller
{

    public function index()
    {
        $feeds = Feed::with('user')->latest()->get();
        return response([
            'feeds' => $feeds
        ], 200,[],JSON_NUMERIC_CHECK);
    }

    

    public function indexall()
    {

        $feeds = Feed::all();
        $data=array();
        foreach ($feeds as $f ) {
            $f->nombre=$f->user->name;
            array_push($data, $f);
        }        
        return response([
            'feeds' => $data]
        , 200,[],JSON_NUMERIC_CHECK);
    }

    
    public function store(Request $request)
    {
        try {
             $request->validate([ 
                'content' => "required",
                "category_id" => "required"
            ]); 
    
            Feed::create([
                "content" => $request->content,
                "category_id" => $request->category_id,
                "user_id" => $request->user_id
            ]);
    
            return response([
                'message' => 'success'
            ], 201);
        } catch (\Exception $e) {
            return response([
                'message' => 'error',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    


    public function likePost($feed_id)
    {
        // Seleccionar publicacion por ID (Admin-angular)
        $feed = Feed::whereId($feed_id)->first();

        if (!$feed) {
            return response([
                'message' => '404 Not found'
            ], 500);
        }

        // Unlike post (NO IMPLEMENTADO AUN)
        $unlike_post = Like::where('user_id', auth()->id())->where('feed_id', $feed_id)->delete();
        if ($unlike_post) {
            return response([
                'message' => 'Unliked'
            ], 200);
        }

        // Like post
        $like_post = Like::create([
            'user_id' => auth()->id(),
            'feed_id' => $feed_id
        ]);
        if ($like_post) {
            return response([
                'message' => 'liked'
            ], 200);
        }
    }

    public function comment(Request $request, $feed_id)
    {

        
        $request->validate([
            'body' => 'required'
        ]);

        $comment = Comment::create([
            'user_id' => auth()->id(),
            'feed_id' => $feed_id,
            'body' => $request->body
        ]);

        return response([
            'message' => 'success'
        ], 201);
    }

    public function getComments($feed_id)
    {
        $comments = Comment::with('feed')->with('user')->whereFeedId($feed_id)->latest()->get();

        return response([
            'comments' => $comments
        ], 200,[],JSON_NUMERIC_CHECK);
    }

    public function destroy($id){
        $feed = Feed::find($id);
        if (!$feed) {
            return response([
              'message' => '404 Not found'
            ], 500);
        }
        $feed->delete();
        return response([
          'message' => 'deleted'
        ], 200);
    }
}


