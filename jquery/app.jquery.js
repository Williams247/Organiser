'use strict';

/*jQuery code*/

const moment = new Date();

$(document).ready(() => {
    //handle page load
    setTimeout(() => {
        $('.page-load-modal').fadeOut()
    }, 1500);

    //handle the drop down
    $('#menu').click(() => {
        $('.menu-drop-down').slideDown('fast').fadeIn('fast')
    });

    $('#reload-reset, #reload-reset-2').click(() => { appInstance.reloadApp() });

    $('.close').click(() => {
        $('.menu-drop-down').slideUp('fast').fadeOut('fast')
    });

    $('.chart-modal').hide();

    $('.analysis').click(() => {
        $('.chart-modal').show();
        $('.menu-drop-down').slideUp('fast').fadeOut('fast');
    });

    $('#close-chart-modal').click(() => { $('.chart-modal').hide() });
    $('#reset-password-list').click(() => appInstance.newUserPassWord())

    //handle callBack functions
    $('.delete-all').click(() => {
        appInstance.deleteAll();
        $('.menu-drop-down').slideUp('fast').fadeOut('fast')
    });

    $('#save-file').click(() => {
        appInstance.saveData();
        $('.menu-drop-down').slideUp('fast').fadeOut('fast')
    });

    $('#cls-month-modal').click(() =>
        $('.month-modal')
        .css({ display: 'none' }));

    //Basic event handlers
    $('#close-btn-month').click(() => {

        $('.month-edit-modal-box').animate({
            'marginTop': '-78rem',
            'opacity': '.7'
        });

        setTimeout(() => {
            $('.month-edit-modal').hide();
            $('.month-edit-modal-box').css({
                'marginTop': '0',
                'opacity': '1'
            });
        }, 555);
    });

    $('#open-month-modal').click(() => {
        $('.month-modal').css({ 'display': 'flex' });
        $('.menu-drop-down').slideUp('fast').fadeOut('fast');

    });

    $('.reload-app').click(() => { appInstance.reloadApp() });

    //make the modal cmd box draggable
    $('.form-password-modal-box, .form-modal-box').draggable({ containment: 'parent' });

    $('.command-line').click(() => {
        $('.cmd-modal').removeClass('hide').fadeIn('fast');
        $('.menu-drop-down')
            .slideUp('fast')
            .fadeOut('fast')
    });

    $('.red').click(() => {
        $('.command-activity').text('Good bye...');
        setTimeout(() => {
            $('.cmd-modal').fadeOut('fast').addClass('hide');
            $('.command-activity').text('');
        }, 1500);
    });

    //handle basic user commands
    $('.command-form').submit(e => {
        e.preventDefault();
        const userCommand = e.target.elements.user_command_input.value.trim().toLowerCase();
        e.target.elements.user_command_input.value = '';
        const returnScreen = $('.command-activity');
        switch (userCommand) {
            case 'help':
                returnScreen.append(
                    '<li>For terminal color, type <strong>color help</strong></li>',
                    '<li>To delete all list permanently, type <strong>delete storage list</strong></li>',
                    '<li>To reset password, type <strong>reset password</strong></li>',
                    '<li>To clear your terminal output, type <strong>clear</strong></li>',
                    '<li>To know this app version, type <strong>app --version</strong></li>',
                    '<li>To know the time and date, type <strong>time and date now</strong></li>',
                    '<li>To set password for the first time, type <strong> create new password </strong></li>',
                    '<li>To remove todo list protect password, type <strong>remove password</strong></li>',
                    '<li>To know about monthly activity, type <strong>monthly activity help</strong></li>',
                    '<li>To reboot this app, type <strong>reboot app</strong></li>',
                    '<li>To close terminal, type <strong>exit</strong></li>'
                ).slideDown('slow')
                break;
            case 'monthly activity help':
                returnScreen.append(
                    '<li>The monthly activity feature of this application is used for creating set goals for every month of the year.</li>',
                    '<li>To delete a particular monthly activity type <strong>delete monthly specific</strong></li>',
                    '<li>To delete all monthly task permanently, type <strong>delete monthly task</strong></li>',
                );
                break;
            case 'delete monthly specific':
                appInstance.deleteMonthlySpecific()
                break;
            case 'remove password':
                appInstance.removePassWord()
                break;
            case 'create new password':
                appInstance.newUserPassWord()
                break;
            case 'clear':
                returnScreen.html('')
                break;
            case 'delete monthly task':

                swal({
                    title: "Are you sure?",
                    text: "Doing this will delete all your monthly tasks!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                      swal("Your monthly activity is deleted!", {
                        icon: "success",
                      });
                        localStorage.removeItem('cardList');
                        setTimeout(() => location.reload(), 2000);
                    } else {
                        swal('Operation terminated!')
                    }
                  });

                break;
            case 'app --version':
                returnScreen.append(
                    '<li>version 1.0.0</li>'
                ).slideDown('slow')
                break;
            case 'color help':
                returnScreen.append(
                    '<li>For red color, type <strong>red</strong></li>',
                    '<li>For blue color, type <strong>blue</strong></li>',
                    '<li>For green color, type <strong>green</strong></li>',
                    '<li>For lightblue color, type <strong>lightblue</strong></li>',
                    '<li>For lightgreen color, type <strong>lightgreen</strong></li>',
                    '<li>For yellow color, type <strong>yellow</strong></li>',
                    '<li>For purple color, type <strong>purple</strong></li>',
                    '<li>For gray color, type <strong>gray</strong></li>',
                ).slideDown('slow')
                break;
            case 'red':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'red' })
                break;
            case 'blue':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'blue' })
                break;
            case 'green':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'green' })
                break;
            case 'lightblue':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'lightblue' })
                break;
            case 'lightgreen':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'lightgreen' })
                break;
            case 'yellow':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'yellow' })
                break;
            case 'purple':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'purple' })
                break;
            case 'white':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'white' })
                break;
            case 'gray':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'gray' })
                break;
            case 'exit':
                $('.command-activity').text('Good bye...');
                setTimeout(() => {
                    $('.cmd-modal').fadeOut('fast').addClass('hide');
                    $('.command-activity').text('');
                }, 1500);
                break;
            case 'reset password':
                $('.form-modal').removeClass('hide');
                break;
            case 'delete storage list':
                appInstance.deleteAll();
                break;
            case 'reboot app':
                appInstance.reloadApp();
                break;
            case 'time and date now':
                returnScreen.append(`<li>${moment.toLocaleString()}</li>`)
                break;
            default:
                if (!userCommand) {
                    returnScreen.append(`<p class="error">You have entered no command, type help.<p>`)
                } else {
                    returnScreen.append(`<p class="error">This command "<strong>${userCommand}</strong>" is not a valid command, type help.<p>`)
                }
        }
    })

    $('.list-group-item').sortable({
        containment: 'parent',
        opacity: .2,
    });

});