<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreMessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'content' => [
                'nullable',
                'required_without:file',
                'string',
                'max:255'
            ],
            'file' => [
                'required_without:content',
                'file',
                'mimes:jpeg,bmp,png,gif,svg,pdf',
                'max:5120'
            ]
        ];
    }
}
