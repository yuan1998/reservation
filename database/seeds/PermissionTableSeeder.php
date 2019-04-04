<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        $tableNames = config('permission.table_names');
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table($tableNames['model_has_permissions'])->truncate();
        DB::table($tableNames['model_has_roles'])->truncate();
        DB::table($tableNames['role_has_permissions'])->truncate();
        DB::table($tableNames['permissions'])->truncate();
        DB::table($tableNames['roles'])->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->permission([
            ['name' => 'all', 'text' => '全部权限'],
            ['name' => 'permission:manager', 'text' => '权限管理'],
            ['name' => 'reservation:table', 'text' => '查看预约表格'],
            ['name' => 'activity:index', 'text' => '查看记录'],
        ]);

        $this->permission([
            ['name' => 'expert:index', 'text' => '查看专家'],
            ['name' => 'expert:store', 'text' => '创建专家'],
            ['name' => 'expert:update', 'text' => '修改专家'],
            ['name' => 'expert:destroy', 'text' => '删除专家'],
        ]);

        $this->permission([
            ['name' => 'timeline:index', 'text' => '查看时间线'],
            ['name' => 'timeline:store', 'text' => '创建时间线'],
            ['name' => 'timeline:update', 'text' => '修改时间线'],
            ['name' => 'timeline:destroy', 'text' => '删除时间线'],
        ]);

        $this->permission([
            ['name' => 'project:index', 'text' => '查看项目'],
            ['name' => 'project:store', 'text' => '创建项目'],
            ['name' => 'project:update', 'text' => '修改项目'],
            ['name' => 'project:destroy', 'text' => '删除项目'],
        ]);

        $this->permission([
            ['name' => 'rest:index', 'text' => '查看休息'],
            ['name' => 'rest:store', 'text' => '安排休息'],
        ]);

        $this->permission([
            ['name' => 'reservation:index', 'text' => '查看预约'],
            ['name' => 'reservation:store', 'text' => '创建预约'],
            ['name' => 'reservation:update', 'text' => '修改预约'],
            ['name' => 'reservation:destroy', 'text' => '删除预约'],
        ]);

        Role::create($this->mergeGuard(
            ['name' => 'admin', 'text' => '超级管理员']
        ))->givePermissionTo('all');
        Role::create($this->mergeGuard(
            ['name' => 'manager', 'text' => '权限管理员']
        ))->givePermissionTo('permission:manager');


        Role::create($this->mergeGuard(
            ['name' => 'defaultUser', 'text' => '正常使用者']
        ))->givePermissionTo([
            'reservation:table',
            'reservation:store',
            'reservation:update',
            'reservation:destroy',
            'rest:store',
            'rest:index',
        ]);


        $user = \App\User::find(1);
        $user->syncRoles('admin');

    }

    protected function permission($arr)
    {
        collect($arr)->each(function ($item) {
            $item = $this->mergeGuard($item);

            Permission::create($item);
        });
    }

    protected function role($arr)
    {
        collect($arr)->each(function ($item) {
            $item = array_merge($item, ['guard_name' => 'api']);

            Role::create($item);
        });
    }

    protected function mergeGuard($item)
    {
        return array_merge($item, ['guard_name' => 'api']);

    }


}
