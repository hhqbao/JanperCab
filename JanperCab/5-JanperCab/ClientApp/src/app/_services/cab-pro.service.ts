import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { CabProDuraformDto } from '../_models/cab-pro/CabProDuraformDto';

@Injectable({ providedIn: 'root' })
export class CabProService {
  constructor(private http: HttpClient) {}

  exportExcel = (data: CabProDuraformDto): Blob => {
    const workBook = XLSX.utils.book_new();
    const sheetOne = XLSX.utils.aoa_to_sheet([]);
    const sheetTwo = XLSX.utils.aoa_to_sheet([]);

    sheetOne['!ref'] = 'A1:Z100';
    sheetTwo['!ref'] = 'A1:Z100';

    sheetOne['C9'] = { v: data.cabinetMaker.name, t: 's' };
    sheetOne['C10'] = { v: data.duraformOrder.deliveryAddress, t: 's' };
    sheetOne['C11'] = { v: data.duraformOrder.deliverySuburb, t: 's' };
    sheetOne['C12'] = { v: data.duraformOrder.deliveryTo, t: 's' };
    sheetOne['C13'] = { v: data.cabinetMaker.phone, t: 's' };
    sheetOne['C14'] = { v: 'Fax', t: 's' };

    sheetOne['K11'] = { v: data.duraformOrder.customerOrderNumber, t: 's' };
    sheetOne['L12'] = {
      v: moment(data.duraformOrder.createdDate).format('DD/MM/YYYY'),
      t: 's',
    };
    sheetOne['L13'] = {
      v: moment(data.duraformOrder.createdDate)
        .add(10, 'days')
        .format('DD/MM/YYYY'),
      t: 's',
    };
    sheetOne['K14'] = { v: data.duraformOrder.customerOrderNumber, t: 's' };
    sheetOne['A19'] = {
      v: `${data.duraformDesign.toUpperCase()}`,
      t: 's',
    };
    sheetOne['E19'] = { v: data.duraformArch, t: 's' };
    sheetOne['J19'] = {
      v: data.duraformOrder.isRoutingOnly
        ? 'DSW'
        : `${data.duraformWrapColor.toUpperCase()} - ${data.duraformWrapType.toUpperCase()}`,
      t: 's',
    };
    sheetOne['N19'] = {
      v: data.duraformEdgeProfile.toUpperCase(),
      t: 's',
    };

    sheetTwo['C9'] = { v: data.cabinetMaker.name, t: 's' };
    sheetTwo['C10'] = { v: data.duraformOrder.deliveryTo, t: 's' };
    sheetTwo['C11'] = { v: data.cabinetMaker.phone, t: 's' };
    sheetTwo['R9'] = { v: data.duraformOrder.customerOrderNumber, t: 's' };
    sheetTwo['R10'] = {
      v: moment(data.duraformOrder.createdDate)
        .add(10, 'days')
        .format('DD/MM/YYYY'),
      t: 's',
    };
    sheetTwo['Q11'] = { v: data.duraformOrder.customerOrderNumber, t: 's' };

    const {
      duraformDoors,
      pantryDoors,
      endPanels,
      duraformDrawers,
    } = data.duraformOrder;

    for (let i = 0; i < duraformDoors.length; i++) {
      const row = i + 26;
      const door = duraformDoors[i];

      let noteForDoor = door.hingeHoleOption
        ? `${door.hingeHoleOption.toString()} `
        : '';

      noteForDoor += door.note.length > 0 ? `${door.note}` : '';

      sheetOne[`A${row}`] = { v: i + 1, t: 'n' };
      sheetOne[`B${row}`] = { v: door.quantity, t: 'n' };
      sheetOne[`C${row}`] = { v: door.height, t: 'n' };
      sheetOne[`D${row}`] = { v: door.width, t: 'n' };
      sheetOne[`E${row}`] = { v: door.top ? 'x' : '', t: 's' };
      sheetOne[`F${row}`] = { v: door.bottom ? 'x' : '', t: 's' };
      sheetOne[`G${row}`] = { v: door.left ? 'x' : '', t: 's' };
      sheetOne[`H${row}`] = { v: door.right ? 'x' : '', t: 's' };
      sheetOne[`I${row}`] = {
        v: door.duraformOption?.toCabProValue().toUpperCase(),
        t: 's',
      };
      sheetOne[`L${row}`] = { v: noteForDoor, t: 's' };
      sheetOne[`N${row}`] = {
        v: data.getEdgeProfile(door.duraformEdgeProfileId).name.toUpperCase(),
        t: 's',
      };
    }

    for (let i = 0; i < pantryDoors.length; i++) {
      const row = i + 38;
      const pantry = pantryDoors[i];

      sheetTwo[`A${row}`] = { v: pantry.quantity, t: 'n' };
      sheetTwo[`B${row}`] = { v: pantry.height, t: 'n' };
      sheetTwo[`C${row}`] = { v: pantry.width, t: 'n' };
      sheetTwo[`D${row}`] = { v: pantry.chairRailHeight, t: 'n' };
      sheetTwo[`E${row}`] = {
        v: data.getChairRailType(pantry.chairRailTypeId)?.name.toUpperCase(),
        t: 's',
      };
      sheetTwo[`F${row}`] = { v: pantry.extraRailBottom ?? '', t: 'n' };
      sheetTwo[`G${row}`] = { v: pantry.top ? 'x' : '', t: 's' };
      sheetTwo[`H${row}`] = { v: pantry.bottom ? 'x' : '', t: 's' };
      sheetTwo[`I${row}`] = { v: pantry.left ? 'x' : '', t: 's' };
      sheetTwo[`J${row}`] = { v: pantry.right ? 'x' : '', t: 's' };
      sheetTwo[`K${row}`] = { v: data.getNote(pantry).toUpperCase(), t: 's' };
    }

    for (let i = 0; i < endPanels.length; i++) {
      const row = i + 38;
      const panel = endPanels[i];

      sheetTwo[`M${row}`] = { v: panel.quantity, t: 'n' };
      sheetTwo[`N${row}`] = { v: panel.numberOfShields, t: 'n' };
      sheetTwo[`O${row}`] = { v: panel.height, t: 'n' };
      sheetTwo[`P${row}`] = { v: panel.width, t: 'n' };
      sheetTwo[`Q${row}`] = { v: panel.extraRailBottom ?? '', t: 'n' };
      sheetTwo[`R${row}`] = { v: panel.extraRailTop ?? '', t: 'n' };
      sheetTwo[`S${row}`] = { v: panel.top ? 'x' : '', t: 's' };
      sheetTwo[`T${row}`] = { v: panel.bottom ? 'x' : '', t: 's' };
      sheetTwo[`U${row}`] = { v: panel.left ? 'x' : '', t: 's' };
      sheetTwo[`V${row}`] = { v: panel.right ? 'x' : '', t: 's' };
      sheetTwo[`X${row}`] = { v: data.getNote(panel).toUpperCase(), t: 's' };
    }

    for (let i = 0; i < duraformDrawers.length; i++) {
      const row = i + 63;
      const drawer = duraformDrawers[i];

      sheetTwo[`C${row}`] = { v: drawer.quantity, t: 'n' };
      sheetTwo[`D${row}`] = {
        v: data.getDrawerType(drawer.duraformDrawerTypeId)?.name,
        t: 's',
      };
      sheetTwo[`F${row}`] = { v: drawer.height, t: 'n' };
      sheetTwo[`G${row}`] = { v: drawer.width, t: 'n' };
      sheetTwo[`I${row}`] = { v: drawer.top ? 'x' : '', t: 's' };
      sheetTwo[`J${row}`] = { v: drawer.bottom ? 'x' : '', t: 's' };
      sheetTwo[`K${row}`] = { v: drawer.left ? 'x' : '', t: 's' };
      sheetTwo[`L${row}`] = { v: drawer.right ? 'x' : '', t: 's' };
      sheetTwo[`M${row}`] = { v: drawer.drawerOne ?? '', t: 'n' };
      sheetTwo[`N${row}`] = { v: drawer.drawerTwo ?? '', t: 'n' };
      sheetTwo[`O${row}`] = { v: drawer.drawerThree ?? '', t: 'n' };
      sheetTwo[`P${row}`] = { v: drawer.drawerFour ?? '', t: 'n' };
      sheetTwo[`Q${row}`] = { v: drawer.drawerFive ?? '', t: 'n' };
      sheetTwo[`R${row}`] = { v: data.getNote(drawer), t: 's' };
    }

    XLSX.utils.book_append_sheet(workBook, sheetOne, 'Duraform P1');
    XLSX.utils.book_append_sheet(workBook, sheetTwo, 'Duraform P2');

    const wbout: ArrayBuffer = XLSX.write(workBook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([wbout], {
      type: 'application/octet-stream',
    });

    return blob;
  };
}
