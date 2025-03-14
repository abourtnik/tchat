<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{config('app.name')}}</title>
    <meta name="description" content="Free web chat"/>
    <meta name="language" content="{{ str_replace('_', '-', app()->getLocale()) }}" />
    <meta name="copyright" content="{{config('app.url')}}" />
    <meta name="author" content="Anton Bourtnik" />

    <meta name="theme-color" content="#6581B7" />
    <meta name="msapplication-navbutton-color" content="#6581B7" />
    <meta name="apple-mobile-web-app-status-bar-style" content="#6581B7" />

    <meta property="og:site_name" content="{{config('app.name')}}" />
    <meta property="og:url" content="{{url()->full()}}" />
    <meta property="og:title" content="{{config('app.name')}}" />
    <meta property="og:description" content="Free web chat" />
    <meta property="og:image" content={{asset('icon.png')}} />
    <meta property="og:language" content="{{ str_replace('_', '-', app()->getLocale()) }}" />

    <link rel="shortcut icon" href="{{asset('favicon.ico')}}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{asset('icon.png')}}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{asset('icon.png')}}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{asset('icon.png')}}">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    @viteReactRefresh
    @vite(['resources/js/main.tsx'])
</head>
<body>
    <div id="app"></div>
    <script type="text/javascript">
        window.USER = {!! Auth::check() ? Auth::user()->json  : 'null' !!}
        window.APP = {
            name : '{{config('app.name')}}',
        }
    </script>
</body>
</html>
