import { Component, OnInit } from '@angular/core';
import { NameDialogService } from "../../../common/widgets/nameModal/name-dialog.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  nombre = undefined;

  constructor(private NameDialog: NameDialogService) { }

  ngOnInit(): void {
  }


  openDlg(): void {
    const dlg = this.NameDialog.open('');

    dlg.afterClosed().subscribe((nombre) => {
      this.nombre = nombre
    })

  }

}
