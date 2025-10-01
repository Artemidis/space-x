<?php

namespace App\Http\Controllers;

use App\Models\Benefit;
use Illuminate\Http\Request;

class BenefitController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'top_text' => 'required|string|max:255',
            'main_value' => 'required|string|max:255',
            'bottom_text' => 'required|string|max:255',
            'order' => 'required|integer',
            'is_active' => 'boolean',
        ]);

        Benefit::create($request->all());

        return redirect()->back()->with('success', 'Benefit успешно создан');
    }

    public function update(Request $request, Benefit $benefit)
    {
        $request->validate([
            'top_text' => 'required|string|max:255',
            'main_value' => 'required|string|max:255',
            'bottom_text' => 'required|string|max:255',
            'order' => 'required|integer',
            'is_active' => 'boolean',
        ]);

        $benefit->update($request->all());

        return redirect()->back()->with('success', 'Benefit успешно обновлен');
    }

    public function destroy(Benefit $benefit)
    {
        $benefit->delete();

        return redirect()->back()->with('success', 'Benefit успешно удален');
    }
}
