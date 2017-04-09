$(document).ready(function(){

    document.getElementById("formulario_login").reset();

    $( "#formulario_login" ).validate( {
        rules: {
            usuario:  { required: true, minlength: 4, maxlength: 20 },
            password: { required: true, minlength: 4, maxlength: 20 }
        },
        messages: {
            usuario: {
                        required: "Por favor, ingrese su usuario",
                        minlength: "M&iacute;nimo 4 caracteres",
                        maxlength: "M&aacute;ximo 20 caracteres"
                    },
            password: {
                        required: "Por favor, ingrese su contrase&ntilde;a",
                        minlength: "M&iacute;nimo 4 caracteres",
                        maxlength: "M&aacute;ximo 20 caracteres"
                    }
        },

        errorElement: "em",
        errorPlacement: function ( error, element ) {
            // Add the `help-block` class to the error element
            error.addClass( "help-block" );

            // Add `has-feedback` class to the parent div.form-group
            // in order to add icons to inputs
            element.parents( ".form-group" ).addClass( "has-feedback" );

            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.parent( "label" ) );
            } else {
                error.insertAfter( element );
            }

            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if ( !element.next( "span" )[ 0 ] ) {
                $( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
            }
        },
        success: function ( label, element ) {
            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if ( !$( element ).next( "span" )[ 0 ] ) {
                $( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );

            }
        },
        highlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".form-group" ).addClass( "has-error" ).removeClass( "has-success" );
            $( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
        },
        unhighlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".form-group" ).addClass( "has-success" ).removeClass( "has-error" );
            $( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
        },
        submitHandler: function () {
            $(".rounded-btn").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i> Conectando...');
                $.ajax({
                    type: "POST",
                    url:  _URL.ajax() + "User/userLogin",
                    data: $("#formulario_login").serialize(),
                    success: function (mostrar) {
                        if( mostrar == "true"){

                            document.location = _URL.ajax() + 'Principal';

                        }else{
                            $(".rounded-btn").html('CONECTAR');
                            var texto = '<div class="alert alert-danger" role="alert">'+
                                           /*'<a class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></a>'+*/
                                            '<p class="text-center">Usuario y/o Contrase&ntilde;a Incorrectos.</p>'+
                                        '</div>';

                            $("#formulario_error").html(texto).show("slow");

                        }

                    },
                    error: function(response){
                            alert("Error interno. Recargue la p&aacute;gina por favor.");
                    }

                });

         return false;
        }

    }); /* FIN VALIDATE formulario login */


});//fin document ready
