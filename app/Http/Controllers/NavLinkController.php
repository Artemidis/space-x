<?php

namespace App\Http\Controllers;

use App\Models\NavLink;
use Illuminate\Http\Request;

class NavLinkController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'order' => 'required|integer',
            'is_active' => 'boolean',
        ]);

        NavLink::create($request->all());

        return redirect()->back()->with('success', 'Ссылка успешно создана');
    }

    public function update(Request $request, NavLink $navLink)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'order' => 'required|integer',
            'is_active' => 'boolean',
        ]);

        $navLink->update($request->all());

        return redirect()->back()->with('success', 'Ссылка успешно обновлена');
    }

    public function destroy(NavLink $navLink)
    {
        $navLink->delete();

        return redirect()->back()->with('success', 'Ссылка успешно удалена');
    }
}
