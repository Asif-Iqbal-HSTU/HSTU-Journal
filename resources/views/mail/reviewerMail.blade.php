Dear {{$u_name}}:
<br>
<br>
The manuscript entitled "{{ $title }}" has been submitted to HSTU Journal.
You are a Reviewer of this paper.
<br>
<br>
Abstract of the paper:
<br>
{{ $abstract }}
<br>
<br>
<p>You have been requested to review the paper. Please confirm your decision:</p>
<a href="{{ route('reviewer.accept', ['reviewer_id' => $reviewer_id, 'paper_id' => $paper_id]) }}">Accept</a> |
<a href="{{ route('reviewer.decline', ['reviewer_id' => $reviewer_id, 'paper_id' => $paper_id]) }}">Decline</a>
<p>Thank you!</p>
<br>
<br>
To login, please use te following Credentials:
<br>
Username: 
<br>
{{$u_name}}
<br>
Initial Password: 
<br>
{{$u_name}}
