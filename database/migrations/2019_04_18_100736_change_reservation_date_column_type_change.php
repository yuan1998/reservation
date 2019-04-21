<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class ChangeReservationDateColumnTypeChange extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
//         DB::statement("ALTER TABLE `reservations` CHANGE `date` `date` TIMESTAMP");

//        Schema::table('reservations', function (Blueprint $table) {
//            $table->dropColumn('date');
//        });
        Schema::table('reservations', function (Blueprint $table) {
            $table->dateTime('date')->nullable()->change();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
//         DB::statement("ALTER TABLE `reservations` CHANGE `date` `date` TIMESTAMP NOT NULL");

//        Schema::table('reservations', function (Blueprint $table) {
//            $table->dropColumn('date');
//        });
        Schema::table('reservations', function (Blueprint $table) {
            $table->timestamp('date')->nullable()->change();
        });
    }
}
