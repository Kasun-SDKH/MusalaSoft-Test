import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IDevice } from '../../interfaces'

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss'],
})
export class DeviceFormComponent implements OnInit {
  @Input()
  public deviceData!: IDevice

  public form!: FormGroup
  public isForUpdate: boolean = false

  @Output()
  public submitFormData = new EventEmitter<IDevice>()

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      uid: ['', Validators.required],
      vendor: ['', Validators.required],
      date: ['', Validators.required],
      status: [false, Validators.required],
    })

    if (this.deviceData !== undefined) {
      this.setDataToUpdate()
    }
  }

  private setDataToUpdate() {
    this.isForUpdate = true
    this.form.patchValue(this.deviceData)
  }
}
