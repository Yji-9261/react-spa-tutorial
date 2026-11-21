<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ItemController extends Controller
{
    /**
     * GET api/v1/items アイテム一覧取得処理
     */
    public function index(Request $request) {
        // $items = $request->user->items()->latest('item_user.id')->paginate(50);
        $items = User::findOrFail(1)->items()->latest('item_user.id')->paginate(50);

        return ItemResource::collection($items);
    }

    /**
     * POST api/v1/lottery ガチャ抽選処理
     */
    public function store(Request $request) {
        $itemResult = DB::transaction(function () {
            $item = $this->draw();
            // $request->user->items()->attach($item->id);
            User::findOrFail(1)->items()->attach($item->id);

            return $item;
        });

        return new ItemResource($itemResult);
    }

    private function draw() {
        // レアリティ1 45%
        // レアリティ2 30%
        // レアリティ3 20%
        // レアリティ4 5%
        $random = random_int(1, 100);
        $drawCoefficients = [45, 30, 20, 5];
        $rarity = 1;
        foreach ($drawCoefficients as $draw) {
            $random -= $draw;
            if ($random <= 0) {
                break;
            }
            $rarity += 1;
        }

        // 同列レアリティのアイテムは均等抽選
        return Item::where('rarity', $rarity)
            ->inRandomOrder()
            ->firstOrFail();
    }
}
