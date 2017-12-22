/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

/**
 * import * as xxx from xxx cause problems generating lazy loaded routes!
 * @see https://github.com/angular/angular-cli/issues/2496#issuecomment-252155012
 * 
 * in our case we use, import * as moment from 'moment'
 * the fix is to import js in .angular-cli.json manually and declare moment here
 */
// moment
declare var moment: any;