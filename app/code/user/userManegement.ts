import { AppObject, Component, ComponentItem, ComponentDataInput, ComponentOption, ComponentDivisor, ComponentPageBody, ComponentView, ComponentMenuVertical, ComponentHeader, ComponentComboBox, ComponentColorEffect, ComponentFont, ComponentAnimationEffect, ComponentAnimationSubEffect, ComponentAnimationSubEffectHolder, ComponentInformation, ComponentElementEvent } from 'backappjh';
import { BasicSocket, UniqueSocket } from 'basicsocket';
import { User } from './user';
import { Authentication } from './authentication';
import { Address } from './address';
import { Phone } from './phone';
import { Permission } from './permission';
import { ComponentTable } from 'backappjh/app/view/common/table/componentTable';
import { ComponentTableLine } from 'backappjh/app/view/common/table/tableLine/componentTableLine';
import { ComponentTableCell } from 'backappjh/app/view/common/table/tableLine/tableCell/componentTableCell';

export class UserManegement extends AppObject {
    private static instance: UserManegement;
    private socketIo: BasicSocket;
    private subscribers: Array<any>;
    private logged: User;
    private tempRegister: Authentication;
    private menu: any;
    private tempObjectArray: Array<any>;

    public static getInstance(father?: Component): UserManegement {
        if (!UserManegement.instance) {
            UserManegement.instance = new UserManegement(father);
        }
        return UserManegement.instance;
    }

    constructor(father?: Component) {
        super(father);
        this.init();
    }

    public subscribe(callback) {
        // we could check to see if it is already subscribed
        this.subscribers.push(callback);
        console.log(callback.name, 'has been subscribed to UserManegement');
    }

    public unsubscribe(callback) {
        this.subscribers = this.subscribers.filter((element) => {
            return element !== callback;
        });
    }

    public publish(data) {
        this.subscribers.forEach((subscriber) => {
            subscriber(data);
        });
    }

    public createUser(component) {
        // console.log('createUser!!!');
        let basicInfoDivisor: ComponentDivisor = (<ComponentPageBody>component.getFather().getFather().getFather().getFather().getFather()).arrayDivisor[2].arrayDivisor[0];
        let name: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[0].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let nickname: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[1].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let mother: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[2].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let father: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[3].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let nUId: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[4].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let uId: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[5].arrayDivisor[0].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let uIdEmitter: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[5].arrayDivisor[0].arrayDivisor[1].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let uIdState: number = (<HTMLSelectElement>basicInfoDivisor.arrayDivisor[5].arrayDivisor[0].arrayDivisor[2].arrayDataInput[0].arrayComboBox[0].getElement()).selectedIndex;
        let birth: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[6].arrayDivisor[0].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let birthState: number = (<HTMLSelectElement>basicInfoDivisor.arrayDivisor[6].arrayDivisor[0].arrayDivisor[1].arrayDataInput[0].arrayComboBox[0].getElement()).selectedIndex;
        let nationality: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[7].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let role: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[8].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        // console.log(name, nickname, mother, father, nUId, uId, birth, nationality, role, uIdEmitter, uIdState, birthState);

        let addressInfoDivisor: ComponentDivisor = (<ComponentPageBody>component.getFather().getFather().getFather().getFather().getFather()).arrayDivisor[3].arrayDivisor[0];
        let type: number = (<HTMLSelectElement>addressInfoDivisor.arrayDivisor[0].arrayDivisor[0].arrayDataInput[0].arrayComboBox[0].getElement()).selectedIndex;
        let typeStreet: number = (<HTMLSelectElement>addressInfoDivisor.arrayDivisor[1].arrayDivisor[0].arrayDataInput[0].arrayComboBox[0].getElement()).selectedIndex;
        let address: string = (<HTMLInputElement>addressInfoDivisor.arrayDivisor[2].arrayDivisor[0].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let number: string = (<HTMLInputElement>addressInfoDivisor.arrayDivisor[2].arrayDivisor[0].arrayDivisor[1].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let complement: string = (<HTMLInputElement>addressInfoDivisor.arrayDivisor[3].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let district: string = (<HTMLInputElement>addressInfoDivisor.arrayDivisor[4].arrayDivisor[0].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let city: string = (<HTMLInputElement>addressInfoDivisor.arrayDivisor[4].arrayDivisor[0].arrayDivisor[1].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let state: number = (<HTMLSelectElement>addressInfoDivisor.arrayDivisor[4].arrayDivisor[0].arrayDivisor[2].arrayDataInput[0].arrayComboBox[0].getElement()).selectedIndex;
        let zip: string = (<HTMLInputElement>addressInfoDivisor.arrayDivisor[5].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        // console.log(type, typeStreet, address, number, complement, district, city, state, zip);

        let phoneInfoDivisor: ComponentDivisor = (<ComponentPageBody>component.getFather().getFather().getFather().getFather().getFather()).arrayDivisor[4].arrayDivisor[0];
        let phoneType: number = (<HTMLSelectElement>phoneInfoDivisor.arrayDivisor[0].arrayDivisor[0].arrayDivisor[0].arrayDataInput[0].arrayComboBox[0].getElement()).selectedIndex;
        let phoneNumber: string = (<HTMLInputElement>phoneInfoDivisor.arrayDivisor[0].arrayDivisor[0].arrayDivisor[1].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let email: string = (<HTMLInputElement>phoneInfoDivisor.arrayDivisor[0].arrayDivisor[1].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        // console.log(phoneType, phoneNumber, email);

        let authInfoDivisor: ComponentDivisor = (<ComponentPageBody>component.getFather().getFather().getFather().getFather().getFather()).arrayDivisor[5].arrayDivisor[0];
        let username: string = (<HTMLInputElement>authInfoDivisor.arrayDivisor[0].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let password: string = (<HTMLInputElement>authInfoDivisor.arrayDivisor[1].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let cpassword: string = (<HTMLInputElement>authInfoDivisor.arrayDivisor[2].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let permission: number = (<HTMLSelectElement>authInfoDivisor.arrayDivisor[3].arrayDivisor[0].arrayDataInput[0].arrayComboBox[0].getElement()).selectedIndex;
        // console.log(username, password, cpassword, permission);

        let auth = new Authentication(username, password, permission);

        let user = new User(name, nickname, mother, father, parseInt(uId, 10), uIdEmitter, uIdState, parseInt(nUId, 10), new Date(birth), birthState, nationality, email, role, auth);
        user.arrayAddress.push(new Address(type, typeStreet, address, number, complement, district, city, state, zip));
        user.arrayPhone.push(new Phone(phoneType, parseInt(phoneNumber, 10)));
        // console.log(user);
        this.socketIo.emit('newUser', user);
    }

    // tslint:disable-next-line:no-empty
    public clearUserInputs(component) { }

    public login(component) {
        console.log('login');
        this.tempRegister = undefined;
        let divisor: ComponentDivisor = (<ComponentPageBody>component.getFather().getFather().getFather().getFather()).arrayDivisor[0];
        let username: string = (<HTMLInputElement>divisor.arrayDivisor[1].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let password: string = (<HTMLInputElement>divisor.arrayDivisor[2].arrayDataInput[0].arrayTextField[0].getElement()).value;
        this.socketIo.emit('login', { username: username, password: password });
    }

    public register(component) {
        let divisor: ComponentDivisor = (<ComponentPageBody>component.getFather().getFather().getFather().getFather()).arrayDivisor[0];
        let username: string = (<HTMLInputElement>divisor.arrayDivisor[1].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let password: string = (<HTMLInputElement>divisor.arrayDivisor[2].arrayDataInput[0].arrayTextField[0].getElement()).value;
        this.tempRegister = new Authentication(username, password);
        this.goTo('createUser');
    }

    public getUsername(component) {
        let _self;
        if (this !== undefined) {
            _self = this;
        } else {
            _self = UserManegement.getInstance();
        }

        if (_self.tempRegister !== undefined) {
            console.log(component);
            (<HTMLInputElement>component.getElement()).value = _self.tempRegister.username;
        }
    }

    public getPassword(component) {
        let _self;
        if (this !== undefined) {
            _self = this;
        } else {
            _self = UserManegement.getInstance();
        }

        if (_self.tempRegister !== undefined) {
            console.log(component);
            (<HTMLInputElement>component.getElement()).value = _self.tempRegister.password;
        }
    }

    public getPermission(component) {
        let _self;
        if (this !== undefined) {
            _self = this;
        } else {
            _self = UserManegement.getInstance();
        }

        // console.log(_self.logged);

        let arrayOption = (<ComponentComboBox>component).arrayOption;
        arrayOption = new Array<ComponentOption>();

        if (_self.logged !== undefined) {
            while (arrayOption.length < _self.logged.authentication.permission + 1) {
                let option = new ComponentOption(component);
                option.information = Permission[arrayOption.length];
                option.renderAfterUpdateJSON();
                arrayOption.push(option);
            }
        } else {
            let option = new ComponentOption(component);
            option.information = Permission[arrayOption.length];
            option.renderAfterUpdateJSON();
            arrayOption.push(option);
        }
    }

    public getInfo(user: User) {
        let menuDivisor = this.getHeader().arrayMenuHorizontal[0].arrayRightHolder[0].arrayDivisor[0].arrayItem[0].arrayMenuVertical[0].arrayDivisor[0];

        let username = menuDivisor.arrayDivisor[0].arrayDivisor[1].arrayDivisor[0].arrayItem[0].colorEffect.font.animationEffect.animationSubEffect.arrayAnimationSubEffectHolder[0];
        let information = username.information;
        information.getElement().innerHTML = user.authentication.username;

        let group = menuDivisor.arrayDivisor[0].arrayDivisor[2].arrayDivisor[0].arrayItem[0].colorEffect.font.animationEffect.animationSubEffect.arrayAnimationSubEffectHolder[0];
        information = group.information;
        let auth: Permission = user.authentication.permission;
        information.getElement().innerHTML = Permission[auth];
        information.information = Permission[auth];
        information.renderAfterUpdateJSON();
    }

    public log(data) {
        if (data.userManegement !== undefined) {
            // console.log(this);
            // console.log(UserManegement.getInstance());
            if (!data.userManegement.user) {
                alert(false);
            } else {
                if (this !== undefined) {
                    this.goTo('home');
                    this.refreshHeader();
                    this.getInfo(data.userManegement.user);
                } else {
                    UserManegement.getInstance().goTo('home');
                    UserManegement.getInstance().refreshHeader();
                    UserManegement.getInstance().getInfo(data.userManegement.user);
                }
            }
            if (this !== undefined) {
                this.logged = data.userManegement.user;
            } else {
                UserManegement.getInstance().logged = data.userManegement.user;
            }

        }
    }

    public isLogged(component?) {
        if (component !== undefined) {
            if (this !== undefined) {
                this.menu = component;
            } else {
                UserManegement.getInstance().menu = component;
            }
        }
        return (UserManegement.getInstance().logged !== undefined);
    }

    public goToLogin() {
        if (this !== undefined) {
            if (!this.isLogged()) {
                this.goTo('login');
            }
        } else {
            if (!UserManegement.getInstance().isLogged()) {
                UserManegement.getInstance().goTo('login');
            }
        }
    }

    public logout(component?) {
        this.socketIo.emit('logoff', {});
        if (this !== undefined) {
            this.logged = undefined;
            this.goTo('login');
            this.refreshHeader();
        } else {
            UserManegement.getInstance().logged = undefined;
            UserManegement.getInstance().goTo('login');
            UserManegement.getInstance().refreshHeader();
        }
        if (component !== undefined) {
            if (this !== undefined) {
                this.menu = component.getFather().getFather();
                this.menu.destroyElement();
            } else {
                UserManegement.getInstance().menu = component.getFather().getFather();
                UserManegement.getInstance().menu.destroyElement();
            }
        }
    }

    public getUsers(component) {
        let userManegement = UserManegement.getInstance();
        userManegement.socketIo.emit('getUsers', {});
        userManegement.subscribe((data) => { userManegement.users(component, data); });
    }

    public users(component, data) {
        if (data.users !== undefined) {
            console.log('Users!!!', data.users);
            for (let index = 0; index < data.users.length; index++) {
                const user = data.users[index];
                this.newLine(component, user.authentication.username, ['user']);
            }
        }
    }

    public getDevices(component) {
        let userManegement = UserManegement.getInstance();
        userManegement.subscribe((data) => { userManegement.devices(component, data); });
    }

    public devices(component, data) {
        // component.destroyChildElements();
        if (data.devices !== undefined) {
            console.log('DEVICES!!!', data.devices);
            console.log('com', component);
            for (let index = 0; index < data.devices.length; index++) {
                let device = data.devices[index];
                this.newDevice(component, device);
            }
        }
    }

    public getNewDevice(component) {
        let userManegement = UserManegement.getInstance();
        userManegement.subscribe((data) => { userManegement.newDevice(component, data); });
    }

    public newDevice(component, data) {
        if (data.newDevice !== undefined) {
            console.log('NEW DEVICE!!!', data.newDevice);
            console.log('com', component);
            let line = this.newLine(component, data.newDevice.identification.serialNumber, ['user', 'device']);
            for (let index = 0; index < data.newDevice.users.length; index++) {
                let user = data.newDevice.users[index];
                this.newLine(line.arrayTableCell[0].arrayDivisor[1].arrayTable[0], user, ['user']);
            }
        }
    }

    public drag(component?, event?, type?: string) {
        if (event !== undefined && component !== undefined) {
            // event.dataTransfer.setData('object', component);
            component.type = type;
            this.getTempObjectArray().push(Object.create(component));
            // console.log('DRAG', event, component);
            // console.log('DRAGtype', type);
        }
    }

    public dropRemove(component?, event?, type?: string) {
        for (let index = 0; index < this.getTempObjectArray().length; index++) {
            let data = this.getTempObjectArray()[index];
            console.log('DROPtype', type);
            console.log('DROPtype2', data.type);
            if (event !== undefined && component !== undefined && data.type === type) {
                data = <Component>data;
                event.preventDefault();
                console.log('DROP', component);
                console.log(data);
                let device = data.getFather().getFather().getFather().arrayDivisor[0].getElement().textContent;
                let user = data.getElement().textContent;
                // console.log('F',  data.getFather().getFather().getFather());
                console.log('removeU', user);
                console.log('removeD', device);
                this.socketIo.emit('removeUser', { device: device, user: user });
                this.refreshGUI(data.getFather().getFather().getFather().getFather().getFather());
            }
        }
    }

    public drop(component?, event?, type?: string) {
        for (let index = 0; index < this.getTempObjectArray().length; index++) {
            let data = this.getTempObjectArray()[index];
            // console.log('DROPtype', type);
            // console.log('DROPtype2', data.type);
            if (event !== undefined && component !== undefined && data.type === type) {
                data = <Component>data;
                event.preventDefault();
                console.log('DROP', component);
                console.log(data);
                let device = component.getFather().getFather().arrayDivisor[0].getElement().textContent;
                let user = data.getElement().textContent;
                console.log('new', user, device);
                this.socketIo.emit('addUser', { device: device, user: user });
                this.refreshGUI(component.getFather().getFather().getFather().getFather());
            }
        }
    }

    public refreshGUI(component: ComponentTable) {
        if (component.arrayTableLine.length > 0) {
            // console.log('DESTROY', component, component.arrayTableLine.length);
            component.destroyChildElements();
            component.arrayTableLine = new Array<ComponentTableLine>();
            // console.log('DESTROYED', component, component.arrayTableLine.length);
            this.socketIo.emit('getDevices', {});
        }
    }

    public allowDrop(component?, event?, type?: string) {
        for (let index = 0; index < this.getTempObjectArray().length; index++) {
            let data = this.getTempObjectArray()[index];
            // console.log('ADROPtype', type);
            // console.log('ADROPtype2', data.type);
            if (event !== undefined && component !== undefined && data.type === type) {
                event.preventDefault();
            } else {
                this.getTempObjectArray().slice(index);
            }
        }
    }

    public getTempObjectArray() {
        return this.tempObjectArray;
    }

    public setTempObjectArray(tempObjectArray) {
        this.tempObjectArray = tempObjectArray;
    }

    private init() {
        let _self = this;
        _self.tempObjectArray = new Array<any>();
        _self.subscribers = new Array<any>();
        _self.socketIo = UniqueSocket.getInstance().getBasicSocket();
        _self.subscribe((data) => { _self.log(data); });

        _self.socketIo.emit('subscribeUserManegement', {});
        _self.socketIo.on('userManegement', (data) => { _self.publish({ userManegement: data }); });

        _self.socketIo.emit('subscribeNewDevice', {});

        _self.socketIo.on('newDevice', (data) => { _self.publish({ newDevice: data }); });
        _self.socketIo.on('devices', (data) => { _self.publish({ devices: data }); });
        _self.socketIo.on('users', (data) => { _self.publish({ users: data }); });

        _self.socketIo.emit('getDevices', {});
    }

    private goTo(page: string) {
        let header;
        let pageBody;
        if (this !== undefined) {
            header = this.getHeader();
            pageBody = this.getPageBody();
        } else {
            header = UserManegement.getInstance().getHeader();
            pageBody = UserManegement.getInstance().getPageBody();
        }
        if (pageBody !== undefined) {
            pageBody.goToPage(page);
        } else {
            pageBody = (<ComponentView>header.getFather()).pageBody;
            pageBody.goToPage(page);
        }
    }

    private refreshHeader() {
        let header: ComponentHeader;
        let pageBody;
        if (this !== undefined) {
            header = this.getHeader();
            pageBody = this.getPageBody();
        } else {
            header = UserManegement.getInstance().getHeader();
            pageBody = UserManegement.getInstance().getPageBody();
        }
        if (header !== undefined) {
            header.getFather();
        } else {
            header = pageBody.getFather().header;
        }

        header.arrayMenuHorizontal[0].arrayRightHolder[0].arrayDivisor[0].arrayItem[0].arrayMenuVertical = new Array<ComponentMenuVertical>();

        if (this !== undefined) {
            header.arrayMenuHorizontal[0].arrayRightHolder[0].arrayDivisor[0].arrayItem[0].arrayMenuVertical.push(this.menu);
            this.menu.insert(header.arrayMenuHorizontal[0].arrayRightHolder[0].arrayDivisor[0].arrayItem[0].getElement());
        } else {
            header.arrayMenuHorizontal[0].arrayRightHolder[0].arrayDivisor[0].arrayItem[0].arrayMenuVertical.push(UserManegement.getInstance().menu);
            UserManegement.getInstance().menu.insert(header.arrayMenuHorizontal[0].arrayRightHolder[0].arrayDivisor[0].arrayItem[0].getElement());
        }
    }

    private newLine(fatherTable: ComponentTable, text: string, type: Array<string>) {
        let line = new ComponentTableLine(fatherTable);
        line.getElement().setAttribute('style', 'border-style: groove;border-width: 1px;box-sizing: border-box;display: inline-block;width: 100%;');
        line.getElement().setAttribute('draggable', 'true');
        let event = new ComponentElementEvent(line);
        let currentType = type.pop();
        event.getElement().setAttribute('style', 'float: left;');
        event.name = 'dragstart';
        event.code = 'UserManegement';
        event.runFunction = 'drag(this,event,"" + currentType + "")';
        console.log('new line:', currentType);
        line.arrayElementEvent.push(event);
        line.renderAfterUpdateJSON();
        let cell = new ComponentTableCell(line);
        cell.getElement().setAttribute('style', 'width: 100%;height: 100%;display: block;float: left;box-sizing: border-box;');
        let divisor = new ComponentDivisor(cell);
        divisor.getElement().setAttribute('style', 'width: 100%;');
        let item = new ComponentItem(divisor);
        item.getElement().setAttribute('style', 'width: 100%;');

        let animationSubEffectHolder = new ComponentAnimationSubEffectHolder(item.colorEffect.font.animationEffect.animationSubEffect);
        animationSubEffectHolder.information.information = text;
        animationSubEffectHolder.information.getElement().innerHTML = text;

        item.colorEffect.font.animationEffect.animationSubEffect.arrayAnimationSubEffectHolder.push(animationSubEffectHolder);
        divisor.arrayItem.push(item);
        cell.arrayDivisor.push(divisor);
        if (type.length > 0) {
            cell.arrayDivisor.push(this.newTable(cell, type));
        }
        line.arrayTableCell.push(cell);
        (<ComponentTable>fatherTable).arrayTableLine.push(line);
        return line;
    }

    private newTable(fatherCell: ComponentTableCell, type: Array<string>) {
        let fatherDivisor = new ComponentDivisor(fatherCell);
        fatherDivisor.getElement().setAttribute('style', 'border-style: groove;border-width: 1px;box-sizing: border-box;display: inline-block;width: 100%;overflow: auto;height: 100px;');

        let table = new ComponentTable(fatherDivisor);
        let event1 = new ComponentElementEvent(table);
        let currentType = type.pop();
        event1.getElement().setAttribute('style', 'float: left;');
        event1.name = 'dragover';
        event1.code = 'UserManegement';
        event1.runFunction = 'allowDrop(this,event,"" + currentType + "")';
        let event2 = new ComponentElementEvent(table);
        event2.getElement().setAttribute('style', 'float: left;');
        event2.name = 'drop';
        event2.code = 'UserManegement';
        event2.runFunction = 'drop(this,event,"" + currentType + "")';
        console.log('new table:', currentType);
        table.arrayElementEvent.push(event1);
        table.arrayElementEvent.push(event2);
        table.renderAfterUpdateJSON();
        table.getElement().setAttribute('style', 'width: 100%;height: 100%;');

        fatherDivisor.arrayTable.push(table);
        return fatherDivisor;
    }
}
