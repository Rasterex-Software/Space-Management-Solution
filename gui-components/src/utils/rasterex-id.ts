/**
 * Allows generating an unique id among the components
 */
export class RasterexId {
    private static id = 0;
    private static prefix = 'rstx-id-';

    public static getUid() {
        return RasterexId.prefix + (++RasterexId.id);
    }
}