<?php

namespace App\Http\Requests;

use App\Rules\expertProjectExistsRule;
use App\Rules\expertRule;
use Illuminate\Foundation\Http\FormRequest;

class ReservationRequest extends FormRequest
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
            'name'        => 'required',
            'date'        => 'required|date',
            'age'         => 'integer',
            'sex'         => 'string',

//            'timeline_id' => 'required|integer|exists:timelines,id',
            'project_id'  => [
                'required',
                'integer',
                new expertRule,
            ],
            'expert_id'   => 'required|integer|exists:experts,id',
        ];
    }
}
