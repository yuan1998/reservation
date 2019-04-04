<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Expert extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'          => $this->id,
            'description' => $this->description,
            'avatar'      => $this->avatar,
            'remark'      => $this->remark,
            'project'     => $this->project,
            'name'        => $this->name,
            'created_at'  => $this->created_at->toDateTimeString(),
            'updated_at'  => $this->updated_at->toDateTimeString(),
        ];
    }
}
