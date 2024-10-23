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
        Schema::create('draftpapers', function (Blueprint $table) {
            $table->id();
            $table->string('paperID')->unique(); // Unique paper ID
            $table->string('type')->nullable(); // Paper type (e.g., "journal", "conference")
            //$table->string('classification'); // Classifications (comma-separated)
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Foreign key to users table
            $table->foreignId('status_id')->constrained()->onDelete('cascade'); // Foreign key to users table
            $table->string('language_option'); // Language option
            $table->text('comments')->nullable(); // Optional comments
            $table->string('title')->nullable(); // Paper title
            $table->text('abstract')->nullable(); // Abstract text
            $table->string('keywords')->nullable(); // Keywords (comma-separated)
            $table->string('funding')->nullable(); // Optional funding information
            $table->string('conflictsOfInterest')->nullable(); // Optional conflicts of interest
            $table->text('ethicalStatement')->nullable(); // Optional ethical statement
            $table->text('consentToPolicies')->nullable(); // Optional consent to policies
            $table->string('docFile')->nullable(); // Path to the editable file (required)
            $table->string('pdfFile')->nullable(); // Path to the PDF file (required)
            $table->string('zipFile')->nullable(); // Path to the image file (optional)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('draftpapers');
    }
};
