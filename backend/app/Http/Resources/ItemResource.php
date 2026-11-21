<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'name' => $this->name,
            'rarity' => $this->rarity,
            'rarity_name' => $this->rarity_name,
            'image_url' => $this->image_url,
            'image_alt' => $this->image_alt,
        ];
    }
}
