<?php

namespace App\Rules;

use App\Models\ExpertProject;
use Illuminate\Contracts\Validation\Rule;

class expertProjectExistsRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $expertId  = request()->get('expert_id', 0);
        $projectId = request()->get('project_id', 0);

        return !ExpertProject::query()->where('expert_id', $expertId)->where('project_id' , $projectId)->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return '医生已经存在该项目.';
    }
}
