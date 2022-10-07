import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StuffService } from 'src/app/services/stuff.service';
import { StuffsComponent } from 'src/app/components/stuffs/stuffs.component';
import { StuffComponent } from 'src/app/components/stuff/stuff.component';



@NgModule({
  declarations: [StuffsComponent, StuffComponent],
  providers:[StuffService],
  imports: [
    CommonModule
  ],
  exports:[StuffsComponent]
})
export class StuffsModule { }
