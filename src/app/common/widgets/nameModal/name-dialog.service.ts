import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NameDialogComponent } from './name-dialog.component';

@Injectable()
export class NameDialogService {

    /**
     * Service class constructor
     */
    public constructor( public dialog: MatDialog ) {  }

    /**
     * Open a confirmation dialog
     */
    public open( Message: string ) {
        const dlgRef = this.dialog.open(NameDialogComponent, {
            disableClose: true,
            maxWidth: '420px',
            data: { message: Message }
        });
        return dlgRef;
    }

}
