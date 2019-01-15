from django.shortcuts import render


def indexView(req):
    '''
        Index View: First view when people visit the app

        :req - request from the client.
        :args,kwargs - extra arguments the client sends.

        -render: returns a view to the client.
    '''
    return render(req, 'index.html', {})
