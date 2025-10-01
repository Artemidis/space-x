<?php

use App\Http\Controllers\BenefitController;
use App\Http\Controllers\NavLinkController;
use App\Models\Benefit;
use App\Models\NavLink;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $navLinks = NavLink::where('is_active', true)
        ->orderBy('order')
        ->get();
    $benefits = Benefit::where('is_active', true)
        ->orderBy('order')
        ->get();
    return Inertia::render('main/main', ['navLinks' => $navLinks, 'benefits' => $benefits]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $navLinks = NavLink::orderBy('order')->get();
        $benefits = Benefit::orderBy('order')->get();
        return Inertia::render('dashboard', ['navLinks' => $navLinks, 'benefits' => $benefits]);
    })->name('dashboard');
    Route::resource('nav-links', NavLinkController::class);
    Route::resource('benefits', BenefitController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
