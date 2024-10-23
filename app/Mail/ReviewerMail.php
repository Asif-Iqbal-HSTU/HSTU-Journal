<?php

namespace App\Mail;

use AllowDynamicProperties;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReviewerMail extends Mailable
{
    use Queueable, SerializesModels;

    public $title;
    public $abstract;

    /**
     * Create a new message instance.
     */
    public function __construct($title, $abstract)
    {
        $this->title = $title;
        $this->abstract = $abstract;
    }

//    public function __construct($subject, $header, $title, $message, $action_url = null, $action_text = null, $support_email = 'support@example.com')
//    {
//        $this->subject = $subject;
//        $this->header = $header;
//        $this->title = $title;
//        $this->message = $message;
//        $this->action_url = $action_url;
//        $this->action_text = $action_text;
//        $this->support_email = $support_email;
//    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reviewer Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.reviewerMail',
            with: ['title' => $this->title, 'abstract' => $this->abstract]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
