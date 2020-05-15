'use strict';

/*Vanilla JavaScript Code*/

const domApi = {
    interface: {
        monthly_activity_modal: document.querySelector('.month-task-container'),
            confirm_password_need: document.querySelector('.confirm-user-modal'),
            user_password_set_login: document.querySelector('.login_user_password'),
            user_password_confirm: document.querySelector('#user_password_two'),
            user_password_set: document.querySelector('#user_password_one'),
            modalEditHeadTitle: document.querySelector('.header-title'),
            listContainer: document.querySelector('.list-group-item'),
            password_modal: document.querySelector('.password-modal'),
            listHeader: document.querySelector('.list-header'),
            data_chart: document.querySelector('#statistics'),
            formModal: document.querySelector('.form-modal'),
            postButton: document.querySelector('button')
    },

    classNames: {
        checkd: 'fa fa-check-square-o checked-button',
        uncheckd: 'fa fa-square-o unchecked-button',
        vanish: 'vanish'
    }
}

const {
    confirm_password_need,
    monthly_activity_modal,
    user_password_set_login,
    user_password_confirm,
    modalEditHeadTitle,
    user_password_set,
    listContainer,
    password_modal,
    data_chart,
    listHeader,
    formModal,
    postButton,
} = domApi.interface;

const now = new Date();

const { uncheckd, checkd, vanish } = domApi.classNames;

class App {
    constructor(checkd, uncheckd) {
        this.check = checkd;
        this.uncheck = uncheckd;
        this.dataList = [{
                titleKey: 'No Activity!',
                noteKey: 'No Activity!',
                monthID: 0,
                createdAtDate: 'No Date!',
                editDate: 'No edits made!'
            },

            {
                titleKey: 'No Activity!',
                noteKey: 'No Activity!',
                monthID: 1,
                createdAtDate: 'No Date!',
                editDate: 'No edits made!'
            },

            {
                titleKey: 'No Activity!',
                noteKey: 'No Activity!',
                monthID: 2,
                createdAtDate: 'No Date!',
                editDate: 'No edits made!'
            },

            {
                titleKey: 'No Activity!',
                noteKey: 'No Activity!',
                monthID: 3,
                createdAtDate: 'No Date!',
                editDate: 'No edits made!'
            },

            {
                titleKey: 'No Activity!',
                noteKey: 'No Activity!',
                monthID: 4,
                createdAtDate: 'No Date!',
                editDate: 'No edits made!'
            },

            {
                titleKey: 'No Activity!',
                noteKey: 'No Activity!',
                monthID: 5,
                createdAtDate: 'No Date!',
                editDate: 'No edits made!'
            },

            {
                titleKey: 'No Activity!',
                noteKey: 'No Activity!',
                monthID: 6,
                createdAtDate: 'No Date!',
                editDate: 'No edits made!'
            },

            {
                titleKey: 'No Activity!',
                noteKey: 'No Activity!',
                monthID: 7,
                createdAtDate: 'No Date!',
                editDate: 'No edits made!'
            },

            {
                titleKey: 'No Activity!',
                noteKey: 'No Activity!',
                monthID: 8,
                createdAtDate: 'No Date!',
                editDate: 'No edits made!'
            },

            {
                titleKey: 'No Activity!',
                noteKey: 'No Activity!',
                monthID: 9,
                createdAtDate: 'No Date!',
                editDate: 'No edits made!'
            },

            {
                titleKey: 'No Activity!',
                noteKey: 'No Activity!',
                monthID: 10,
                createdAtDate: 'No Date!',
                editDate: 'No edits made!'
            },

            {
                titleKey: 'No Activity!',
                noteKey: 'No Activity!',
                monthID: 11,
                createdAtDate: 'No Date!',
                editDate: 'No edits made!'
            }
        ];
        this.dataId = 0;
    }

    postData(e) {
        e.preventDefault();
        const input = e.target.elements.user_input.value.trim();
        if (!input) {
            //Take no action
        } else {
            listContainer.innerHTML += `
			<li class="lists">
		      <div class="fa fa-square-o unchecked-button" id="check-mark" title='Check mark'></div>
			  <div class="text-content">${input}</div>
			  <div class="fa fa-close" id="close"></div>
		 	</li>
			`;
            e.target.elements.user_input.value = '';
        }
        //Placed outside the else statement so they can work when the button does an auto click
        const domApiTwo = {
            ch: document.querySelectorAll('#check-mark'),
            cls: document.querySelectorAll('#close'),
            checkedButton: document.querySelectorAll('.checked-button'),
            uncheckedButton: document.querySelectorAll('.unchecked-button')
        }

        const { ch, cls, checkedButton, uncheckedButton } = domApiTwo;

        this.statisicsData(checkedButton.length, uncheckedButton.length);

        ch.forEach(loop => loop.onclick = () => {
            if (loop.className === this.uncheck && loop.title === 'Check mark') {
                loop.className = this.check;
                loop.title = 'Uncheck';
                loop.style.color = 'lightgreen';
            } else {
                loop.className = this.uncheck;
                loop.title = 'Check mark';
                loop.style.color = ''
            }
        });

        cls.forEach(loop => loop.addEventListener('click', function() {
            this.parentElement.remove();
        }))
    }

    saveData() {
        let rawData = JSON.stringify(listContainer.innerHTML);
        localStorage.setItem('todoSystem', rawData);
        alert('saved!')
        this.reloadApp()
    }

    fetchData() {
        if (localStorage.getItem('todoSystem') === null) {
            //Do nothing
        } else {
            let getData = localStorage.getItem('todoSystem');
            let processedDataList = JSON.parse(getData);
            listContainer.innerHTML = processedDataList;
        }
        appInstance.fetchDataOnMonthly()
    }

    fetchDataOnMonthly() {
        //Create default storage arrays of object.
        if (!localStorage.getItem('cardList')) {
            const rawCardData = JSON.stringify(this.dataList);
            localStorage.setItem('cardList', rawCardData);
            return false
        } else {
            //Go ahead and fetch the data from localStorage
        }
    }

    resetPassword(e) {
        e.preventDefault();
        const userPassword = e.target.elements.user_password.value.trim();
        const confirmPassword = e.target.elements.confirm_password.value.trim();
        e.target.elements.user_password.value = '';
        e.target.elements.confirm_password.value = '';
        if (userPassword === localStorage.getItem('listPasswordAuthenticate')) {
            localStorage.setItem('listPasswordAuthenticate', confirmPassword);
            alert('Reset password made');
            formModal.className = "hide"
        } else {
            alert('Please try again!')
        }
    }

    getPasswordOnload() {
        //If there is no activated password
        const passStart = localStorage.getItem('isPassWordNeeded');
        const parsedPassStart = JSON.stringify(passStart);
        if (!passStart) {
            confirm_password_need.style.display = 'flex';
        } else if (parsedPassStart === false) {
            confirm_password_need.style.display = 'none';
        } else {
            password_modal.className = 'password-modal';
            confirm_password_need.style.display = 'none';
        }
    }

    userPasswordSwitch() {
        if (user_password_set.type === 'password') {
            user_password_set.type = 'text'
        } else {
            user_password_set.type = 'password'
        }
    }

    confirmPasswordSwitch() {
        if (user_password_two.type === 'password') {
            user_password_two.type = 'text'
        } else {
            user_password_two.type = 'password'
        }
    }

    loginUser() {
        if (user_password_set_login.type === 'password') {
            user_password_set_login.type = 'text'
        } else {
            user_password_set_login.type = 'password'
        }
    }

    setUserPassword(e) {
        e.preventDefault();
        const setNewPassword = e.target.elements.user_password.value.trim();
        const getPassword = localStorage.getItem("listPasswordAuthenticate");
        if (!getPassword || getPassword === null || getPassword === '') {
            password_modal.className = 'password-modal';
            localStorage.setItem('listPasswordAuthenticate', setNewPassword);
        } else if (getPassword == '' || getPassword !== null || getPassword !== '') {
            if (setNewPassword === getPassword) {
                alert('Welcome');
                this.setToTrue();
                password_modal.className = 'hide';
            } else {
                alert('Wrong password')
            }
        }
    }

    doNeedPassword(boolFeedBack) {
        const userFeedBackPassStart = JSON.stringify(boolFeedBack);
        localStorage.setItem('isPassWordNeeded', userFeedBackPassStart);
        confirm_password_need.style.display = 'none';
        if (boolFeedBack === true) {
            alert("The password you will type into the protect password textbox will be your todo list protect password.")
        } else {
            alert("You've decided not to create a todo list protect password and that is absolutely fine.")
        }
        this.checkStatus()
    }

    checkStatus() {
        const checkIfNeedBe = localStorage.getItem('isPassWordNeeded');
        const parseCheckIfNeedBe = JSON.parse(checkIfNeedBe);
        if (parseCheckIfNeedBe === false) {
            password_modal.className = 'hide';
        } else if (!checkIfNeedBe) {
            //Take no action
        } else {
            password_modal.className = 'password-modal';
        }
    }

    reloadApp() {
        location.reload()
    }

    deleteAll() {
        if(confirm('Doing this will delete all your lists permanently, do still want to') === true) {
        	listContainer.innerHTML = '';
        	localStorage.removeItem('todoSystem')
        } else {
        	alert('Operation terminated!')
        }
    }

    switchpane(navigated, pane) {

        const panel = document.querySelectorAll('.form-edit-view-agent');
        const paneSwitch = document.querySelectorAll('.edit-view');

        paneSwitch.forEach(paneSwitch => {
            paneSwitch.classList.remove('edit-view-current');
        });

        panel.forEach(panel => {
            panel.classList.remove('current-pane-edit');
            panel.classList.add('hide-container');
        });

        document.querySelector(`.${pane}`).classList.add('current-pane-edit');
        document.querySelector(`.${navigated}`).classList.add('edit-view-current');
    }

    getNotes(e) {
        e.preventDefault();

        const title = e.target.elements.note_title.value.trim();
        const note = e.target.elements.note_content.value.trim();

        if (title === 'No Activity!' || note === 'No Activity!' || title === 'No Activity' || note === 'No Activity') {
            alert(`You're not permitted to enter this text ""${title || note}"", it's FORBIDDEN!`)
        } else {

            const titleKey = `title-${this.dataId}`;
            const noteKey = `note-${this.dataId}`;

            let getStorageData = localStorage.getItem('cardList');
            let getCardList = JSON.parse(getStorageData);

            let createdAt;
            let editedAt;

            let timeStamp = now.toLocaleString();

            if (getCardList[this.dataId].createdAtDate === 'No Date!') {
                createdAt = timeStamp
            } else {
                createdAt = getCardList[this.dataId].createdAtDate;
            }

            if (getCardList[this.dataId].titleKey !== title || getCardList[this.dataId].noteKey !== note) {
                editedAt = timeStamp
            }

            getCardList[this.dataId] = {
                titleKey: title,
                noteKey: note,
                createdAtDate: createdAt,
                editDate: editedAt
            }

            const saveStorageData = JSON.stringify(getCardList);
            localStorage.setItem('cardList', saveStorageData);
            alert('Month activity saved!')
            this.reloadApp()
        }
    }

    deleteMonthlySpecific() {
        const getMonthToDelete = prompt('What month activity do you want to delete?');
        const monthInLowerCase = getMonthToDelete.toLowerCase();
        const deleteMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        const errorMessage = 'Try to type the month activity you want to delete next time, i.e "january", "february", "march".....';
        if (!monthInLowerCase) {
            alert(errorMessage)
        } else {
            for (let i = 0; i < deleteMonths.length; i++) {
                if (monthInLowerCase === deleteMonths[i]) {
                    //get the index and set the monthly activity for that year to normal
                    const monthlyData = localStorage.getItem('cardList');
                    const parsedMonthlyData = JSON.parse(monthlyData);
                    parsedMonthlyData[i] = {
                        titleKey: 'No Activity!',
                        noteKey: 'No Activity!',
                        monthID: i,
                        createdAtDate: 'No Date!',
                        editDate: 'No edits made!'
                    }
                    alert(`${deleteMonths[i].toUpperCase()} activity was successfully deleted`);
                    location.reload();
                    const stringifiedMonthData = JSON.stringify(parsedMonthlyData);
                    localStorage.setItem('cardList', stringifiedMonthData)
                } else if (monthInLowerCase !== deleteMonths[i]) {
                    //Take no action
                }
            }
        }
    }

    newUserPassWord() {
        const createNewPassword = localStorage.getItem('listPasswordAuthenticate');
        if (!createNewPassword) {
            password_modal.className = 'password-modal';
        } else if (createNewPassword) {
            alert('You already have a password')
        }
    }

    setToTrue() {
        localStorage.setItem('isPassWordNeeded', true)
    }

    removePassWord() {
        const bool = localStorage.getItem('listPasswordAuthenticate');
        const protectPass = localStorage.getItem('isPassWordNeeded');
        if (confirm('Doing this will make you lose your protect password') === true) {
            if (bool && protectPass) {
                localStorage.removeItem('listPasswordAuthenticate');
                localStorage.removeItem('isPassWordNeeded');
            } else {
                alert('You have ho password')
            }
        } else {
            alert('Operation terminated')
        }
    }

    statisicsData(pending, completed) {

        data_chart.getContext('2d');

        Chart.defaults.global.defaultFontSize = 18;
        Chart.defaults.global.defaultFontFamily = 'Lato';

        new Chart(data_chart, {
            type: 'doughnut',
            data: {
                labels: ['Pending Task', 'Completed Task'],
                datasets: [{
                    label: 'Activities',
                    data: [completed, pending],
                    backgroundColor: ['gray', 'lightgreen'],
                    borderWidth: 5,
                    borderColor: 'gray',
                    hoverBorderColor: 'black'
                }]
            }
        })
    }

    monthMonthlyActivity() {
            const getDataArray = localStorage.getItem('cardList');
            const processedData = JSON.parse(getDataArray);

            const monthArray = [{
                    month: 'January',
                    dataTitle: processedData[0].titleKey,
                    dataNote: processedData[0].noteKey,
                    monthID: 0,
                    createdAtDate: processedData[0].createdAtDate,
                    editDate: processedData[0].editDate
                },

                {
                    month: 'February',
                    dataTitle: processedData[1].titleKey,
                    dataNote: processedData[1].noteKey,
                    monthID: 1,
                    createdAtDate: processedData[1].createdAtDate,
                    editDate: processedData[1].editDate
                },

                {
                    month: 'March',
                    dataTitle: processedData[2].titleKey,
                    dataNote: processedData[2].noteKey,
                    monthID: 2,
                    createdAtDate: processedData[2].createdAtDate,
                    editDate: processedData[2].editDate
                },

                {
                    month: 'April',
                    dataTitle: processedData[3].titleKey,
                    dataNote: processedData[3].noteKey,
                    monthID: 3,
                    createdAtDate: processedData[3].createdAtDate,
                    editDate: processedData[3].editDate
                },

                {
                    month: 'May',
                    dataTitle: processedData[4].titleKey,
                    dataNote: processedData[4].noteKey,
                    monthID: 4,
                    createdAtDate: processedData[4].createdAtDate,
                    editDate: processedData[4].editDate
                },

                {
                    month: 'June',
                    dataTitle: processedData[5].titleKey,
                    dataNote: processedData[5].noteKey,
                    monthID: 5,
                    createdAtDate: processedData[5].createdAtDate,
                    editDate: processedData[5].editDate
                },

                {
                    month: 'July',
                    dataTitle: processedData[6].titleKey,
                    dataNote: processedData[6].noteKey,
                    monthID: 6,
                    createdAtDate: processedData[6].createdAtDate,
                    editDate: processedData[6].editDate
                },

                {
                    month: 'August',
                    dataTitle: processedData[7].titleKey,
                    dataNote: processedData[7].noteKey,
                    monthID: 7,
                    createdAtDate: processedData[7].createdAtDate,
                    editDate: processedData[7].editDate
                },

                {
                    month: 'September',
                    dataTitle: processedData[8].titleKey,
                    dataNote: processedData[8].noteKey,
                    monthID: 8,
                    createdAtDate: processedData[8].createdAtDate,
                    editDate: processedData[8].editDate
                },

                {
                    month: 'October',
                    dataTitle: processedData[9].titleKey,
                    dataNote: processedData[9].noteKey,
                    monthID: 9,
                    createdAtDate: processedData[9].createdAtDate,
                    editDate: processedData[9].editDate
                },

                {
                    month: 'November',
                    dataTitle: processedData[10].titleKey,
                    dataNote: processedData[10].noteKey,
                    monthID: 10,
                    createdAtDate: processedData[10].createdAtDate,
                    editDate: processedData[10].editDate
                },

                {
                    month: 'December',
                    dataTitle: processedData[11].titleKey,
                    dataNote: processedData[11].noteKey,
                    monthID: 11,
                    createdAtDate: processedData[11].createdAtDate,
                    editDate: processedData[11].editDate
                }
            ];

            for (let i = 0; i < monthArray.length; i++) {

                let monthTitle;

                if (monthArray[i].dataTitle.length > 17) {
                    let reduceTitleLength = monthArray[i].dataTitle.slice(0, 15);
                    monthTitle = reduceTitleLength + '....';
                } else {
                    monthTitle = monthArray[i].dataTitle
                }

                monthly_activity_modal.innerHTML += `
				<div class="monthly-task">
					<h2>${monthArray[i].month}</h2>
					 <div class="content-containment">
					 	<li>
							<h3 class="card-title">Title: ${monthTitle}</h3>
						</li>
						  <li>
							<button id="${monthArray[i].monthID}" class="view-button" title="View and edit ${monthArray[i].month} task">
								View <span class="fa fa-eye"></span>
							</button>
						 </li>
					 </div>
				</div>
            `;

                const cardButton = document.querySelectorAll('.view-button');
                cardButton.forEach(i => {
                            i.onclick = () => {
                                    const editModal = document.querySelector('.month-edit-modal');
                                    editModal.style.display = 'flex';
                                    const titleTextField = document.querySelector('.text-title');
                                    const formTextField = document.querySelector('.note');
                                    const viewContainer = document.querySelector('.view-container');

                                    if (monthArray[i.id].dataTitle === 'No Activity!' && monthArray[i.id].dataNote === 'No Activity!') {
                                        titleTextField.value = '';
                                        formTextField.value = '';
                                    } else {
                                        titleTextField.value = monthArray[i.id].dataTitle;
                                        formTextField.value = monthArray[i.id].dataNote;
                                    }

                                    modalEditHeadTitle.innerText = `${monthArray[i.id].month} activity`;

                                    viewContainer.innerHTML = `
                       <li>${monthArray[i.id].dataTitle ==='No Activity!' && monthArray[i.id].dataNote ==='No Activity!' ? `<span class="fa fa-square-o error"></span> You have no task`:`<span class="fa fa-check-square-o success"></span> You have ${monthArray[i.id].month} task`} </li>
                       <li>${monthArray[i.id].createdAtDate ==='No Date!' ? `<span class="fa fa-square-o error"></span> No task time stamp`:`<span class="fa fa-check-square-o success"></span> Created At: ${monthArray[i.id].createdAtDate}`}</li>
                       <li>${monthArray[i.id].editDate ==='No edits made!' || monthArray[i.id].editDate === monthArray[i.id].createdAtDate ? `<span class="fa fa-square-o error"></span> You've not edited ${monthArray[i.id].month} task`:`<span class="fa fa-check-square-o success"></span> Edited at: ${monthArray[i.id].editDate}`}</li>
                    `;
                    const storageID = Number(i.id);
                    this.dataId = storageID;

                }
            });
        }
    }
}

const appInstance = new App(checkd, uncheckd);

window.onload = () => {
    //call back function on pageload
    setTimeout(() => { appInstance.monthMonthlyActivity() }, 1000);
    appInstance.getPasswordOnload();
    appInstance.checkStatus();
    appInstance.fetchData();
    postButton.click();
}