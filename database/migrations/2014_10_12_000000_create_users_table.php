<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username')->index();
            $table->string('avatar')->default('');
            $table->string('name')->default('');
            $table->string('nickName')->default('');
            $table->string('password');
            $table->string('weixin_openid')->nullable()->unique();
            $table->string('weapp_openid')->nullable()->unique();
            $table->string('weixin_unionid')->nullable()->unique();
            $table->string('weixin_session_key')->nullable();

            $table->string('status', 1)->default(1);

            $table->string('email')->nullable()->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
