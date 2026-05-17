<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_primary_superadmin')->default(false)->after('email');
        });

        $primaryEmail = env('SUPERADMIN_EMAIL');
        if ($primaryEmail) {
            DB::table('users')
                ->where('email', $primaryEmail)
                ->limit(1)
                ->update(['is_primary_superadmin' => true]);
        }
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_primary_superadmin');
        });
    }
};
