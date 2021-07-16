export class VariablesConstants {
    public static PASSWORD_PATTERN = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{7,}$";
    public static NAME_PATTERN : string = "^[A-Z][a-zA-Z]*$";
    public static USERNAME_PATTERN : string = "^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$";

}