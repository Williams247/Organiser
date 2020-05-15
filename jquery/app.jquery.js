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
                return false;
            case 'monthly activity help':
                returnScreen.append(
                    '<li>The monthly activity feature of this application is used for creating set goals for every month of the year.</li>',
                    '<li>To delete a particular monthly activity type <strong>delete monthly specific</strong></li>',
                    '<li>To delete all monthly task permanently, type <strong>delete monthly task</strong></li>',
                );
                return false;
            case 'delete monthly specific':
                appInstance.deleteMonthlySpecific()
                return false;
            case 'remove password':
                appInstance.removePassWord()
                return false;
            case 'create new password':
                appInstance.newUserPassWord()
                return false;
            case 'clear':
                returnScreen.html('')
                return false;
            case 'delete monthly task':
                if (confirm('Doing this will delete all your monthly tasks!') === true) {
                    localStorage.removeItem('cardList');
                    alert('Your monthly activity is deleted!');
                    appInstance.reloadApp()
                } else {
                    alert('Operation terminated!')
                }
                return false;
            case 'app --version':
                returnScreen.append(
                    '<li>version 1.0.0</li>'
                ).slideDown('slow')
                return false;
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
                return false;
            case 'red':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'red' })
                return false;
            case 'blue':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'blue' })
                return false;
            case 'green':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'green' })
                return false;
            case 'lightblue':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'lightblue' })
                return false;
            case 'lightgreen':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'lightgreen' })
                return false;
            case 'yellow':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'yellow' })
                return false;
            case 'purple':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'purple' })
                return false;
            case 'white':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'white' })
                return false;
            case 'gray':
                $('.command-activity, .user_command_input')
                    .css({ 'color': 'gray' })
                return false;
            case 'exit':
                $('.command-activity').text('Good bye...');
                setTimeout(() => {
                    $('.cmd-modal').fadeOut('fast').addClass('hide');
                    $('.command-activity').text('');
                }, 1500);
                return false;
            case 'reset password':
                $('.form-modal').removeClass('hide');
                return false;
            case 'delete storage list':
                appInstance.deleteAll();
                return false;
            case 'reboot app':
                appInstance.reloadApp();
                return false;
            case 'time and date now':
                returnScreen.append(`<li>${moment.toLocaleString()}</li>`)
                return false;
            case 'documentation':
                window.open('documentation.html');
                alert('The documentation page has been opened on a new tab, go check it out!');
                return false;
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