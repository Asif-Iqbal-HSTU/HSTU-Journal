<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('papers', function (Blueprint $table) {
            $table->string('slug')->unique()->nullable()->after('title');
            $table->string('doi')->nullable()->unique()->after('slug');
            $table->date('published_at')->nullable()->after('doi');
            $table->string('volume')->nullable()->after('published_at');
            $table->string('issue')->nullable()->after('volume');
            $table->boolean('is_published')->default(false)->after('issue');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('papers', function (Blueprint $table) {
            $table->dropColumn(['slug','doi','published_at','volume','issue','is_published']);
        });
    }
};
