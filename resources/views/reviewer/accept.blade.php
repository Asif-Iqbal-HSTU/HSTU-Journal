<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Thank You for Accepting</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
    <div class="card">
        <h1>Thank You for Accepting!</h1>
        <p>We appreciate your time and effort in reviewing this paper.</p>
        <a href="{{ route('login') }}" class="btn btn-primary">Login to Your Account</a>
    </div>
</body>
</html>
