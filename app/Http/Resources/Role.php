<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Role extends JsonResource
{


    public function toArray($request)
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'text'        => $this->text,
            'permissions' => $this->permissions,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }

}
