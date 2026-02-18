<?php

namespace App\Http\Controllers;

use App\Models\Editor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class EditorManagementController extends Controller
{
    public function index()
    {
        $editors = Editor::orderBy('sort_order')->get();
        return Inertia::render('Admin/Editors/Index', [
            'editors' => $editors
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'sort_order' => 'integer',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('editors', 'public');
            $validated['image_path'] = '/storage/' . $path;
        }

        Editor::create($validated);

        return redirect()->back()->with('success', 'Editor added successfully.');
    }

    public function update(Request $request, Editor $editor)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'sort_order' => 'integer',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($editor->image_path) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $editor->image_path));
            }
            $path = $request->file('image')->store('editors', 'public');
            $validated['image_path'] = '/storage/' . $path;
        }

        $editor->update($validated);

        return redirect()->back()->with('success', 'Editor updated successfully.');
    }

    public function destroy(Editor $editor)
    {
        if ($editor->image_path) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $editor->image_path));
        }
        $editor->delete();
        return redirect()->back()->with('success', 'Editor deleted successfully.');
    }

    public function updateOrder(Request $request)
    {
        $orders = $request->input('orders'); // Array of {id, sort_order}
        foreach ($orders as $item) {
            Editor::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }
        return redirect()->back()->with('success', 'Order updated successfully.');
    }
}
