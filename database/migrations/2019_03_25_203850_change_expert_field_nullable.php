<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeExpertFieldNullable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('experts', function (Blueprint $table) {
            $table->string('avatar')->nullable()->change();
            $table->string('description')->nullable()->change();
            $table->string('remark')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('experts', function (Blueprint $table) {
            $table->string('avatar')->nullable(false)->change();
            $table->string('description')->nullable(false)->change();
            $table->string('remark')->nullable(false)->change();
        });
    }
}
