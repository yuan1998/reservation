<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExpertRestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expert_rests', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamp('date');
            $table->unsignedInteger('expert_id');
            $table->unsignedInteger('timeline_id');
            $table->boolean('rest_day')->default(false);

            $table->foreign('expert_id')
                ->references('id')
                ->on('experts')
                ->onDelete('cascade');

            $table->foreign('timeline_id')
                ->references('id')
                ->on('timelines')
                ->onDelete('cascade');

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
        Schema::dropIfExists('expert_rests');
    }
}
