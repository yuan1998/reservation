<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExpertProjectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expert_project', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('expert_id');
            $table->unsignedInteger('project_id');

//            $table->foreign('expert_id')
//                ->references('id')
//                ->on('experts')
//                ->onDelete('cascade');
//
//            $table->foreign('project_id')
//                ->references('id')
//                ->on('projects')
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
        Schema::dropIfExists('expert_project');
    }
}
