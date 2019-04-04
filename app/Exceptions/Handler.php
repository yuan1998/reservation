<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\MessageBag;
use Illuminate\Validation\ValidationException;
use Symfony\Component\Debug\Exception\FatalThrowableError;
use Symfony\Component\HttpFoundation\Response;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Exception               $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof ModelNotFoundException) {
            return response([
                'code'    => 0,
                'message' => 'Model传参有误.'
            ], 400);
        }

        if (config('app.debug')) {
            $error      = $this->convertExceptionToResponse($exception);
            $statusCode = $error->getStatusCode($exception);
            if (!$message = $exception->getMessage()) {
                $message = sprintf('%d %s', $statusCode, Response::$statusTexts[$statusCode]);
            }
            $replacements = [
                'message' => $message,
            ];


            if ($exception instanceof MessageBag && $exception->hasErrors()) {
                $replacements['message'] = $exception->getErrors();
            }

            if ($exception instanceof QueryException) {
                $statusCode = 400;
            }

            if ($exception instanceof FatalThrowableError) {
                $statusCode = 400;
            }

            if ($exception instanceof ValidationException) {
                $replacements['message'] = $exception->errors();
                $statusCode              = 400;
            }
            if ($code = $exception->getCode()) {
                $statusCode = $code;
            }
            $replacements['code'] = $statusCode;

            return response($replacements, $statusCode);
        }

        if ($exception instanceof \Spatie\Permission\Exceptions\UnauthorizedException) {
            return response([
                'code'    => 4,
                'message' => 'Unauthorized'
            ], 403);
        }

        return parent::render($request, $exception);
    }

}
