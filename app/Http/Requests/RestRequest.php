<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'expert_id' => 'required|exists:experts,id|integer',
            'timeline_id' => 'required|exists:timelines,id|integer',
            'date'      => 'required|date',
            'rest_day'  => 'boolean',
        ];
    }
}
