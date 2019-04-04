<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\User::class, 30)->create();
        $user           = \App\User::find(1);
        $user->username = 'yuan1998';
        $user->email    = 'chizhiyueshu@gmail.com';
        $user->save();

        $user           = \App\User::find(2);
        $user->username = 'admin';
        $user->save();
    }
}
