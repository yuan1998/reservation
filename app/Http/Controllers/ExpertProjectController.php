<?php

namespace App\Http\Controllers;

use App\Http\Requests\expertProjectRequest;
use App\Models\Expert;
use App\Models\ExpertProject;
use App\Models\Project;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ExpertProjectController extends Controller
{
    public function expertAddProject(expertProjectRequest $request, Expert $expert)
    {
        $id      = $request->get('project_id', 0);
        $project = Project::find($id);

        if (!$project) {
            return $this->responseError('Project is no exists');
        }

        return $this->responseSuccess($expert->addProject($id));
    }

    public function projectAddExpert(expertProjectRequest $request, Project $project)
    {
        $id     = $request->get('expert_id', 0);
        $expert = Expert::find($id);

        if (!$expert) {
            return $this->responseError('Expert is no exists');
        }

        return $this->responseSuccess($project->addExpert($id));
    }

    public function store(expertProjectRequest $request)
    {
        $data = $request->only(['expert_id', 'project_id']);
        return $this->responseSuccess(ExpertProject::create($data), Response::HTTP_CREATED);
    }
}
