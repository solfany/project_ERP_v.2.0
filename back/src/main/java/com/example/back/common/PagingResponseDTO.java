package com.miracle.project.common;

public class PagingResponseDTO {
    private Object data;
    private PageDTO pageInfo;

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public PageDTO getPageInfo() {
        return pageInfo;
    }

    public void setPageInfo(PageDTO pageInfo) {
        this.pageInfo = pageInfo;
    }

	@Override
	public String toString() {
		return "PagingResponseDTO [data=" + data + ", pageInfo=" + pageInfo + "]";
	}
}
