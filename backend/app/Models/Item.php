<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Item extends Model
{
    use HasFactory;

    /**
     * レアリティ名称変換テーブル
     */
    protected const RARITY_NAMES = [
        1 => 'N',
        2 => 'R',
        3 => 'SR',
        4 => 'SSR',
    ];

    protected $fillable = [
        'name',
        'rarity',
        'image_url',
        'image_alt',
    ];

    protected function rarityName(): Attribute {
        return Attribute::make(
            get: function () {
                // 範囲外チェック。オーバーしている位場合はレアリティをそのまま表示
                if ($this->rarity <= count(self::RARITY_NAMES)) {
                    return self::RARITY_NAMES[$this->rarity];
                } else {
                    return $this->rarity;
                }
            }
        );
    }

    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
}
