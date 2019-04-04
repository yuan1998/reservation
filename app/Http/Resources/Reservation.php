<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Reservation extends JsonResource
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
            'name'        => $this->name,
            'age'         => $this->age,
            'sex'         => $this->sex,
            'phone'       => $this->phone,
            'date'        => $this->date,
            'description' => $this->description,
            'remark'      => $this->remark,
            'timeline_id' => $this->timeline_id,
            'project_id'  => $this->project_id,
            'expert_id'   => $this->expert_id,
            'createdBy'   => $this->createdBy,
            'updatedBy'   => $this->updatedBy,
            'created_at'  => $this->created_at->toDateTimeString(),
            'updated_at'  => $this->updated_at->toDateTimeString(),
        ];
    }
}
