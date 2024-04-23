import { FormControl, FormGroup } from "@angular/forms";

export default class ValidateForm{
    static validateAllFormFileds(formGroup:FormGroup){
        Object.keys(formGroup.controls).forEach(field=>{
          const controls =formGroup.get(field);
          if(controls instanceof FormControl){
            controls.markAsDirty({onlySelf:true});
          }else if (controls instanceof FormGroup){
            this.validateAllFormFileds(controls)
          }
    
        })
      }
}