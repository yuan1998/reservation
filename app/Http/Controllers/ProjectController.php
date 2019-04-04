<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\ExpertProject;
use App\Models\Project;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\Project as ProjectResource;

class ProjectController extends Controller
{
    public $log_name = '项目';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function index()
    {
        if (!$this->hasPermission(['project:index', 'reservation:table'])) {
            return $this->respondPermission();
        }

        return ProjectResource::collection(Project::orderBy('order')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ProjectRequest $request
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function store(ProjectRequest $request)
    {
        if (!$this->hasPermission('project:store')) {
            return $this->respondPermission();
        }

        $user          = $this->getUser();
        $data          = $request->all();
        $data['order'] = (Project::count() + 1);

        $data['created_user_id'] = $user->id;
        $data['updated_user_id'] = $user->id;


        $project = Project::create($data);
        $this->storeLog($project, ':causer.name 创建了一各项目 :subject.name ');

        return new ProjectResource($project);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project $project
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function show(Project $project)
    {
        if (!$this->hasPermission('project:show')) {
            return $this->respondPermission();
        }

        return new ProjectResource($project);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Project      $project
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function update(Request $request, Project $project)
    {
        if (!$this->hasPermission('project:update')) {
            return $this->respondPermission();
        }
        $user = $this->getUser();

        $data['updated_user_id'] = $user->id;

        $origin = $project->toArray();
        $project->update($request->all());
        $this->updateLog($project, $origin, ":causer.name 修改了 :subject.name 项目");

        return new ProjectResource($project);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @throws \Exception
     * @param  Project $project
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function destroy(Project $project)
    {
        if (!$this->hasPermission('project:destroy')) {
            return $this->respondPermission();
        }
        $project->delete();
        $this->destroyLog($project, ":causer.name 删除了 :subject.name ");
        return response()->json(null, 204);
    }

    public function updateOrder(Request $request)
    {
        $user = $this->getUser();
        $data = $request->get('data', null);

        if (!$data) {
            return $this->responseError('Request Error . Missing Parameter "data"');
        }

        collect($data)->each(function ($id, $index) use ($user) {
            Project::where('id', $id)->update(['order' => $index + 1, 'updated_user_id' => $user->id]);
        });

        return $this->responseSuccess(null);
    }
}
