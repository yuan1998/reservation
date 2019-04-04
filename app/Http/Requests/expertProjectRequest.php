<?php

namespace App\Http\Requests;

use App\Rules\expertProjectExistsRule;
use Illuminate\Foundation\Http\FormRequest;

class expertProjectRequest extends FormRequest
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
            'project_id' => [
                'required',
                'integer',
            ],
            'expert_id'  => [
                'required',
                'integer',
                new expertProjectExistsRule
            ],
        ];
    }
}
