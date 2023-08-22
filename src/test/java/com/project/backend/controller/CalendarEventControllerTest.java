//package com.project.backend.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.project.backend.dto.CalendarEventDto;
//import com.project.backend.entity.CalendarEvent;
//import com.project.backend.repository.CalendarEventRepository;
//import com.project.backend.service.CalendarEventService;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//
//import static org.hamcrest.Matchers.hasSize;
//import static org.mockito.Mockito.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//
//
//@WebMvcTest(CalendarEventControllerTest.class)
//public class CalendarEventControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private CalendarEventRepository calendarEventRepository;
//
//    @MockBean
//    private CalendarEventService calendarEventService;
//
//    // ObjectMapper를 사용하여 객체를 JSON 문자열로 변환하는 메서드
//    private static String asJsonString(final Object obj) {
//        try {
//            return new ObjectMapper().writeValueAsString(obj);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @DisplayName("[GET] 일정 갱신 - 일정 정보를 요청받았을 때 일정 리스트를 리턴한다.")
//    @Test
//    public void givenNothing_whenRequestCalendarEvent_thenReturnCalendarEventList() throws Exception {
//        // 가짜 CalendarEvent 데이터 리스트 생성
//        List<CalendarEvent> calendarEventList = new ArrayList<>();
//        calendarEventList.add(CalendarEvent.CreateCalendarEvent(1L, "Event 1", "사원1", new Date(), new Date(), "Description"));
//        calendarEventList.add(CalendarEvent.CreateCalendarEvent(2L, "Event 2", "사원2", new Date(), new Date(), "Description"));
//
//        // CalendarEventRepository findAll() 메서드 호출 시 위에서 생성한 가짜 데이터를 리턴하도록 설정
//        when(calendarEventRepository.findAll()).thenReturn(calendarEventList);
//
//        // "/api/calendarevents" 경로로 GET 요청을 보내고 결과 검증
//        mockMvc.perform(get("/api/calendarevents"))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andExpect(jsonPath("$").isArray())
//                .andExpect(jsonPath("$", hasSize(2)))
//                .andExpect(jsonPath("$[0].empNum").value(1))
//                .andExpect(jsonPath("$[0].title").value("Event 1"))
//                .andExpect(jsonPath("$[1].empNum").value(2))
//                .andExpect(jsonPath("$[1].title").value("Event 2"));
//
//        // repository의 findAll() 메서드가 한 번 호출되었는지 검증
//        verify(calendarEventRepository, times(1)).findAll();
//        // repository의 메서드 호출 외에 다른 상호작용이 없었는지 검증
//        verifyNoMoreInteractions(calendarEventRepository);
//    }
//
//    @DisplayName("[POST] 일정 추가 - 일정 생성요청을 받으면 일정을 생성한다.")
//    @Test
//    public void givenCalendarEvent_whenRequesting_thenCreateCalendarEvent() throws Exception {
//        // 가짜 CalendarEventDto 생성
//        CalendarEventDto calendarEventDto = new CalendarEventDto(1L, "Event 1", "사원1", new Date(), new Date(), "Description");
//
//        // CalendarEventService CreateCalendarEvent() 메서드 호출 시 가짜 CalendarEvent 생성
//        CalendarEvent createdEvent = new CalendarEvent(1L, "Event 1", "사원1", new Date(), new Date(), "Description");
//        when(calendarEventService.CreateCalendarEvent(calendarEventDto)).thenReturn(createdEvent);
//
//        // "/api/calendarevents/add" 경로로 POST 요청을 보내고 결과 검증
//        mockMvc.perform(MockMvcRequestBuilders.post("/api/calendarevents/add")
//                        .content(asJsonString(calendarEventDto))
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(MockMvcResultMatchers.content().string("일정이 성공적으로 저장되었습니다."));
//    }
//
//    @DisplayName("[DELETE] 일정 삭제 - 일정 삭제요청을 받으면 일정을 삭제한다.")
//    @Test
//    public void givenCalendarEventId_whenRequesting_thenDeletingCalendarEvent() throws Exception {
//        Long id = 1L;
//
//        // CalendarEventService DeleteCalendarEvent() 메서드 호출 시 ResponseEntity 리턴
//        ResponseEntity<String> deleteResponse = ResponseEntity.ok("일정이 성공적으로 삭제되었습니다.");
//        when(calendarEventService.DeleteCalendarEvent(id)).thenReturn(deleteResponse);
//
//        // "/api/calendarevents/delete/{calendarEventId}" 경로로 DELETE 요청을 보내고 결과 검증
//        mockMvc.perform(MockMvcRequestBuilders.delete("/api/calendarevents/delete/{calendarEventId}", id))
//                .andExpect(status().isOk())
//                .andExpect(MockMvcResultMatchers.content().string("일정이 성공적으로 삭제되었습니다."));
//    }
//}