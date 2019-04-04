<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Activity extends JsonResource
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
            'id'           => $this->id,
            'log_name'     => $this->log_name,
            'description'  => $this->description,
            'subject_id'   => $this->subject_id,
            'subject_type' => $this->subject_type,
            'causer_id'    => $this->causer_id,
            'causer'       => $this->causer,
            'subject'      => $this->subject,
            'causer_type'  => $this->causer_type,
            'properties'   => $this->properties,
            'ip'           => $this->ip,
            'method'       => $this->method,
            'created_at'   => $this->created_at->toDateTimeString(),
            'updated_at'   => $this->updated_at->toDateTimeString(),
        ];
    }
}
