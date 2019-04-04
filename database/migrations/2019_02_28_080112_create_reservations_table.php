<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->increments('id');

            $table->string('name');
            $table->integer('age')->default(0);
            $table->string('sex')->default('未知');
            $table->string('phone')->default('');
            $table->timestamp('date');

            $table->string('description')->default('');
            $table->string('remark')->default('');

            $table->unsignedInteger('timeline_id');
            $table->unsignedInteger('project_id');
            $table->unsignedInteger('expert_id');
            $table->unsignedInteger('created_user_id');
            $table->unsignedInteger('updated_user_id');

            $table->foreign('expert_id')
                ->references('id')
                ->on('experts')
                ->onDelete('cascade');

            $table->foreign('timeline_id')
                ->references('id')
                ->on('timelines')
                ->onDelete('cascade');


            $table->foreign('project_id')
                ->references('id')
                ->on('projects')
                ->onDelete('cascade');
//
//            $table->foreign('created_user_id')
//                ->references('id')
//                ->on('users')
//                ->onDelete('cascade');
//
//            $table->foreign('updated_user_id')
//                ->references('id')
//                ->on('users')
//                ->onDelete('cascade');

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
        Schema::dropIfExists('reservations');
    }
}
